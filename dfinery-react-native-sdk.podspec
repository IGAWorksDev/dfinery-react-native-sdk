require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "dfinery-react-native-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.0" } 
  s.source       = { :git => package["repository"]["url"], :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.public_header_files = "ios/DfineryReactNativeSdk/DfineryReactNativeSdk/DfinerySDKManager.h"
  s.header_dir = "DfineryReactNativeSdk"
  
  s.dependency "React-Core"
  s.dependency "DfinerySDK", "2.3.2"
  s.dependency "DfinerySDKServiceExtension", "2.3.2"
end
