export class DFGetGoogleAdvertisingIdCallback {
  constructor(googleAdvertisingId, isLimitAdTrackingEnabled) {
    this._googleAdvertisingId = googleAdvertisingId;
    this._isLimitAdTrackingEnabled = isLimitAdTrackingEnabled;
  }

  get googleAdvertisingId() {
    return this._googleAdvertisingId;
  }

  get isLimitAdTrackingEnabled() {
    return this._isLimitAdTrackingEnabled;
  }
} 