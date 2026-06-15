<details open>
<summary>EN</summary>





## 1.1.0 (2026-06-15)

##### Changed
- Improved logic to handle service ID changes. [iOS]

##### Fixed
- Enhanced Data Integrity: Resolved an issue where user identity was incorrectly mapped for events triggered before SDK initialization. [Android]

##### Enhancement
- Stabilized Push Receipt Reporting: Optimized the delivery mechanism to prevent missing push receipt logs in background and Doze mode on Android 13+. [Android]
- Standardized Platform Logic: Unified data formats across platforms (iOS/Web) and optimized immediate data transmission upon any identity update. [Android]
- Added Intent Extra keys to support direct utilization of push click data. [Android]
  - `com.igaworks.dfinery.push.extra.IS_DFINERY_PUSH` (Boolean): A flag to verify if the notification was sent by Dfinery.
  - `com.igaworks.dfinery.push.extra.PUSH_PAYLOAD` (String/JSON): The full raw data of the received push notification.
  - `com.igaworks.dfinery.push.extra.CLICK_RESULT` (String/JSON): Refined click action data based on the clicked area.

##### Versions

- **Android**
  - Dfinery Android SDK 2.7.0
- **iOS**
  - Dfinery iOS SDK 2.5.0
## 1.0.5 (2026-04-14)

##### Fixed
- fixed a bug where in-app messages were not displayed when the end time was earlier than the start time [iOS]

##### Versions

- **Android**
  - Dfinery Android SDK 2.6.0
- **iOS**
  - Dfinery iOS SDK 2.4.1
## 1.0.4 (2026-01-15)

##### Fixed
- Improved logic for precise matching between events, identifiers, and device information has been applied, enabling accurate contextual data collection at the time of occurrence in any situation. [Android]
- Improved internal logic within setIdentity() to handle edge cases more reliably. [iOS]

##### Versions

- **Android**
  - Dfinery Android SDK 2.4.6
- **iOS**
  - Dfinery iOS SDK 2.3.4
## 1.0.3 (2025-11-20)

##### Changed
- Reinstall logic changed [iOS]

##### Versions

- **Android**
  - Dfinery Android SDK 2.4.3
- **iOS**
  - Dfinery iOS SDK 2.3.3
## 1.0.2 (2025-10-27)

##### Fixed
- In applications with the Dfinery SDK installed and push integration completed, the issue where push notifications received through a route other than Dfinery Console were notified with empty content has been resolved. [Android]

##### Versions

- **Android**
  - Dfinery Android SDK 2.4.3
- **iOS**
  - Dfinery iOS SDK 2.3.2

## 1.0.1 (2025-10-01)

##### Notes

- [iOS] Resolved key window loss when in-app messages were opened and closed in iOS WebView.
- [Android] Resolved navigation issue for deeplink screen when tapping Android push notifications.

##### Versions

- **Android**
  - Dfinery Android SDK 2.4.1
- **iOS**
  - Dfinery iOS SDK 2.3.2


## 1.0.0 (2025-06-26)

##### Notes

- Initial release.

##### Versions

- **Android**
  - Dfinery Android SDK 2.3.3
- **iOS**
  - Dfinery iOS SDK 2.2.1

</details>

<details open>
<summary>KO</summary>





## 1.1.0 (2026-06-15)

##### 변경됨
- 서비스 ID 변경 시 로직 수정 [iOS]

##### 고쳐짐
- 데이터 정합성 강화: SDK 초기화 이전 호출된 이벤트의 사용자 식별 정보가 잘못 매핑되는 오류를 해결했습니다. [Android]

##### 개선
- 광고 푸시 수신 리포트 안정화: Android 13 이상 및 백그라운드/Doze 환경에서 푸시 수신 리포팅이 누락되지 않도록 전송 방식을 개선했습니다. [Android]
- 플랫폼 로직 표준화: 타 플랫폼(iOS/Web)과 데이터 포맷을 동일하게 맞추고, 식별 정보 변경 시 데이터 전송이 즉각 이루어지도록 최적화했습니다. [Android]
- 푸시 클릭 시 전달되는 데이터를 직접 활용할 수 있도록 Intent Extra 키를 추가했습니다. [Android]
  - `com.igaworks.dfinery.push.extra.IS_DFINERY_PUSH` (Boolean): Dfinery에서 발송한 푸시인지 확인하는 플래그
  - `com.igaworks.dfinery.push.extra.PUSH_PAYLOAD` (String/JSON): 수신된 푸시 알림의 전체 원본 데이터
  - `com.igaworks.dfinery.push.extra.CLICK_RESULT` (String/JSON): 사용자가 클릭한 지점에 대해 정제된 클릭 액션 정보

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.7.0
- **iOS**
  - Dfinery iOS SDK 2.5.0
## 1.0.5 (2026-04-14)

##### 고쳐짐
- 인앱메시지 스케줄 세부 설정에서 시작 시간보다 종료 시간이 이전인 경우, 인앱메시지가 미노출 되는 버그 수정 [iOS]

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.6.0
- **iOS**
  - Dfinery iOS SDK 2.4.1
## 1.0.4 (2026-01-15)

##### 고쳐짐
- 이벤트와 식별자·기기 정보 간의 정밀 매칭 로직을 적용하여, 어떤 상황에서도 발생 시점의 정확한 맥락 데이터를 수집할 수 있도록 개선했습니다. [Android]
- setIdentity() 내부 로직을 개선하여 에지 케이스를 보다 안정적으로 처리하도록 수정되었습니다. [iOS]

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.4.6
- **iOS**
  - Dfinery iOS SDK 2.3.4
## 1.0.3 (2025-11-20)

##### 변경됨
- 재설치 로직 수정 [iOS]

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.4.3
- **iOS**
  - Dfinery iOS SDK 2.3.3
## 1.0.2 (2025-10-27)

##### 고쳐짐
- Dfinery SDK가 탑재되고 푸시 연동이 완료된 애플리케이션에서, Dfinery Console을 통하지 않고 다른 경로로 수신된 푸시 알림의 내용이 비어있는 상태로 노출되는 문제가 해결되었습니다. [Android]

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.4.3
- **iOS**
  - Dfinery iOS SDK 2.3.2

## 1.0.1 (2025-10-01)

##### 주요 사항

- [iOS] 웹뷰 환경에서 인앱메시지를 열고 닫았을 때 keywindow를 잃는 문제 수정
- [Android] 푸시 클릭시 딥링크에 해당하는 화면으로 이동하지 않는 문제 수정

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.4.1
- **iOS**
  - Dfinery iOS SDK 2.3.2


## 1.0.0 (2025-06-26)

##### 주요 사항

- 최초 배포.

##### 버전 정보

- **Android**
  - Dfinery Android SDK 2.3.3
- **iOS**
  - Dfinery iOS SDK 2.2.1

</details>
