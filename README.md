# appsmarthome
-- Ứng dụng giám sát và điều khiển nhà thông minh <br/>
<b>1. Các công cụ phần cứng hổ trợ cho việc giám sát và điều khiển</b> <br/>
1.1 Raspberry pi 3 (máy tính chạy hệ điều hành linux hổ trợ cho việc lấy dữ liệu từ các cảm biến và ra hành động điều khiển) <br/>
1.1.1 Dùng ngôn ngữ lập trình Python3 chạy trên Raspberry pi 3 để tiến hành xử lý 2 hành động <br/>
a. Hành động 1 : tiến hành lấy dữ liệu từ các cảm biến bên ngoài và đưa lên server(Nodejs) <br/>
b. Hành động 2 : tiền hành lấy dữ liệu từ server về ( dữ liệu do người dùng thao tác ) và tiến hành xử lý (như thao tác bật tắt đèn) ra môi trường <br/>
1.2 Các cảm biến được dùng : Nhiệt độ , độ ẩm , khí gas , khí co2 , mưa <br/>
1.3 Bóng đèn <br/>
<b>2. Server để tiến hành lưu dữ liệu từ Python3 đưa lên</b> <br/>
2.1 Server (Nodejs + Expressjs) <br/>
2.2 CSDL MongoDB <br/>
<b>3. Các công nghệ phần mềm hổ trợ việc hiển thị giao ra giao diện cho người dùng có thể giám sát và điều khiển (Lấy dữ liệu từ server) </b><br/>
3.1 Công nghệ Node-Red (hiển thị trên pc) <br/>
3.2 Công nghệ React Native (hiển thị trên mobile) <br/>
3.3 Socket.io (Hổ trợ việc realtime) <br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/v4Al-_IYfTk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

