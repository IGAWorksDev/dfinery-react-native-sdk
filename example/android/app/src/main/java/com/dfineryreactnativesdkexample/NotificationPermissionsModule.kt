package com.dfineryreactnativesdkexample

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

class NotificationPermissionsModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), PermissionListener {

    companion object {
        const val NAME = "NotificationPermissions"
        private const val REQUEST_CODE = 1001
    }

    private var permissionPromise: Promise? = null

    override fun getName(): String = NAME

    private fun getActivity(): Activity? {
        return reactContext.currentActivity
    }

    @ReactMethod
    fun getPermissionStatus(promise: Promise) {
        try {
            val status = checkPermissionStatus()
            promise.resolve(status)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        try {
            // Android 13+ (API 33) requires runtime permission for notifications
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
                // Below Android 13, notifications are allowed by default
                val result = WritableNativeMap().apply {
                    putString("status", "authorized")
                    putBoolean("granted", true)
                }
                promise.resolve(result)
                return
            }

            val currentStatus = checkPermissionStatus()
            
            if (currentStatus == "authorized") {
                val result = WritableNativeMap().apply {
                    putString("status", "authorized")
                    putBoolean("granted", true)
                }
                promise.resolve(result)
                return
            }

            if (currentStatus == "denied") {
                // Already denied, user must enable in settings
                val result = WritableNativeMap().apply {
                    putString("status", "denied")
                    putBoolean("granted", false)
                }
                promise.resolve(result)
                return
            }

            // Request permission
            val activity = getActivity()
            if (activity == null) {
                promise.reject("ERROR", "Activity is null")
                return
            }

            if (activity !is PermissionAwareActivity) {
                promise.reject("ERROR", "Activity does not implement PermissionAwareActivity")
                return
            }

            permissionPromise = promise
            activity.requestPermissions(
                arrayOf(Manifest.permission.POST_NOTIFICATIONS),
                REQUEST_CODE,
                this
            )
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ): Boolean {
        if (requestCode != REQUEST_CODE) {
            return false
        }

        val promise = permissionPromise ?: return true
        permissionPromise = null

        // Mark as asked
        val prefs = reactContext.getSharedPreferences("notification_permissions", 0)
        prefs.edit().putBoolean("has_asked", true).apply()

        val granted = grantResults.isNotEmpty() && 
                      grantResults[0] == PackageManager.PERMISSION_GRANTED

        val result = WritableNativeMap().apply {
            putString("status", if (granted) "authorized" else "denied")
            putBoolean("granted", granted)
        }
        promise.resolve(result)
        
        return true
    }

    private fun checkPermissionStatus(): String {
        // Android 13+ (API 33) requires POST_NOTIFICATIONS permission
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            return "authorized"
        }

        val context = reactContext
        val activity: Activity? = getActivity()
        
        return when {
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.POST_NOTIFICATIONS
            ) == PackageManager.PERMISSION_GRANTED -> "authorized"
            
            activity != null && ActivityCompat.shouldShowRequestPermissionRationale(
                activity,
                Manifest.permission.POST_NOTIFICATIONS
            ) -> "not-determined"
            
            else -> {
                // Check if we've asked before by checking shared preferences
                val prefs = context.getSharedPreferences("notification_permissions", 0)
                val hasAsked = prefs.getBoolean("has_asked", false)
                if (hasAsked) "denied" else "not-determined"
            }
        }
    }
}
