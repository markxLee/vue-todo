# vue app: todo list
For the team to learn about vue.

`Phase 1`
- Mọi người sẽ tự tạo 1 branch theo tên hoặc nickname của mình sau đó init 1 project vue.
- Nội dung công việc: mọi người sẽ tạo todo list bằng vue.js cụ thể như sau:
  - Có 1 giao diện input text để nhập nội dung task
  - List todo để thể hiện các task đã nhập, phía trước có check box để select chọn task
  - Sau khi check vào task sẽ show ra các icon hoặc dropdown menu phía sau để: remove task, done task (khi chọn done task sẽ gạch ngang task và disable không cho un-check), pin task (task nào được pin sẽ nhảy lên trên cùng, bên dưới những task đã pin trước đó), Unpin nếu task trước đó đã pin.
* Chia nhỏ các component, sử dụng tất cả các kiến thức của vue như method, computed, slot, props, emit ....
- Nâng cao:
  - Sử dụng thư viện UI Material Design Framework (vuetify)
  - Sử dụng localStorage để lưu trạng thái của todo-list, khi tắt trình duyệt mở lại không bị mất dữ liệu
  - ... Không giới hạn các technical sữ dụng

`Phase 2`
- Thêm màn hình todo list sữ dụng firebase, nội dung tương tự phase 1 nhưng thay vì sữ dụng local store thì lưu dữ liệu trực tiếp lên realtime database của firebase
- Dùng router hoặc tab, button ... để chuyển đổi qua lại giữa 2 chế độ local store và firebase

`Phase 3`
- Tự build server backend (php, ruby, java, node, phython ...) để lưu dữ liệu todo list
- Thêm chức năng auth (theo framework hoặc jwt auth)
- Thêm màn hình todo list lưu dữ liệu vào backend server, xử dụng thư viện axios của vue để kết nối api
- Thêm chức năng sync qua lại giữa các kiểu lưu todolist ...
- 