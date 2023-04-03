# 캡스톤 디자인 프로젝트 RIDESHARE

-   node install
-   npm install
-   expo install

expo 적용 후 실행하기 위해서는 다음 2가지 중 하나를 수행해야 한다.

1. expo 앱이 다운로드된 공기계 android를 컴퓨터에 유선연결 후 실행 (만일 노트북일 경우 현재 사용하는 핸드폰과 같은 네트워크에 접속시키고 expo 앱을 다운받아 실행)
2. 안드로이드 스튜디오를 통한 가상 디바이스 생성 후 실행

**google api 키는 일정이상 사용시 유료임으로 유의**

**_TODO_**

1. 카풀,택시 카테고리에서의 리스트 구현 및 구글맵 마커,팝업 커스텀

    - 리스트에서의 아이템들은 구글맵에서 마커로 표현
    - 카풀의 경우 리스트를 클릭 시, 상세 컴포넌트로 이동
    - 홈 화면의 통합검색에서 검색 시 목적지 기준으로 일정 반경 거리에 해당하는 요소들만 리스트에 적재
        - 리스트에서 클릭시 지도와 함께 상세 컴포넌트로 이동
    - 택시의 경우 리스트에서 바로 참여하게 구성
    - 전반적으로 택시, 카풀 모두 해당 카테고리에 들어갔을 때 맵을 우선적으로 보여주고 오른쪽 하단의 버튼을 누르면 리스트 컴포넌트가 띄워질 수 있도록 구성

    - 구글맵 렌더링에 전체적인 구상은 다음과 같습니다.

        - Map.js 컴포넌트 하나로 렌더링을 합니다. state 또는 navigation의 route.params를 통해 자신을 호출하는 부모가 Taxi/CarPool에 따라 렌더링이 다르게 되도록 구현
        - 위 부분은 회의를 통해 결정

    - **문제 사항**
        - 현재 하단 네비게이션이 MapDisplay.js가 렌더링될 때 실행되지 않는 부분과 하단 네비게이션으로 carpool 또는 taxi에 접속했을 시 로컬서버에서 불러와지지 않는 오류발생

2. my info 구성
3. 채팅 기능 구현

커밋 형식
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor : 코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
