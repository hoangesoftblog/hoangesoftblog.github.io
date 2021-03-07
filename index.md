# Intel H81/B85/H97/Z97 – Bạn sẽ chọn ai? (P1: Core i7-4790K)

Link bài viết gốc: [[Guide] Intel Chipset H81-B85-H97-Z97 – Bạn sẽ chọn ai? - Kỳ 1: Thử nghiệm cùng i7-4790K](https://tinhte.vn/thread/guide-intel-chipset-h81-b85-h97-z97-ban-se-chon-ai-ky-1-thu-nghiem-cung-i7-4790k.2453374/)

## 1. Mở đầu

Xin chào, mình là Hoàng. Đây là bài viết đầu tiên của blog này mà mình cóp nhặt và sửa lại từ Internet.

Như đã biết, LGA1150 là 1 dòng Socket đặc biệt, khi tất cả các chipset (H81, B85, H87/H97 và Z87/Z97) này đều hỗ trợ (chính thức hoặc không) ép xung (OC) theo hệ số nhân (HSN) với các con chip dòng K, qua đó khoảng cách về hiệu năng giữa các chipset đã không còn quá cách biệt về lý thuyết.

Thông qua bài viết này, các bạn sẽ có được nhiều thông tin hơn về các dòng chipset mainboard Intel từ H81, B85, cho tới H97, Z97, để các bạn có thể tự quyết định cho mình một chiếc mainboard phù hợp với nhu cầu cũng như giá tiền. Ở phần 1 này, mình sẽ test với **Core i7-4790k** - trùm cuối của dòng K Socket LGA1150. Và phần 2 sẽ là với **Pentium G3258** - vi xử lý cấp thấp nhưng vẫn hỗ trợ OC theo HSN. <!-- Mình sẽ so sánh hiệu năng của các bài test thực tế như chơi game và làm việc giữa các chipset trên cả 2 CPU và sau đó là đưa ra kết luận cuối cùng. -->

## 2. Thông số các chipset và điểm mạnh/yếu của chúng

<details>
    <summary><em>Lưu ý nhỏ:</em></summary>
    Tác giả gốc bài viết không test với H87/Z87, mà thay vào đó là H97/Z97, tuy nhiên không có sự khác biệt lớn nào về tính năng giữa 2 thế hệ chipset này.
</details><br>

Sau đây là bảng so sánh chi tiết thông số giữa các chipset với nhau:
!["Thông số chipset:"](https://diendan.amtech.vn/attachments/chipset_specs-png.46128/ "Thông số chipset")

Nhìn bảng thông số và phân tích nhanh từng cặp chipset, chúng ta có thể dễ dàng nhận thấy giữa H97 và Z97 đều giống nhau ở hầu hết mọi thông số, trừ việc Z97 được hỗ trợ 3 tính năng: OC thông qua HSN CPU, Bus RAM hỗ trợ xung nhịp cao hơn mức 1600MHz và khả năng phân chia số lanes PCI-E cần thiết cho hệ thống chạy đa card đồ họa SLI/CF. Trong khi đó, H97 không được hỗ trợ 3 tính năng trên. 

Tuy nhiên, với việc các nhà sản xuất mainboard lớn như ASUS, Gigabyte và MSI tung ra các bản BIOS mở khóa ép xung cho mainboard H97 thì H97 chỉ còn thiếu 2 tính năng là Bus RAM xung nhịp cao và phân chia số lanes PCI-E. Vì thế, khoảng cách giữa H97 và Z97 cũng đã thu hẹp lại một chút.

(Phân tích B85 và H81)

<!-- 2 chipset còn lại là B85 và H81 cũng có nhiều điểm tương đồng với nhau nhưng cũng có nhiều điểm khác biệt rõ ràng. Cụ thể: 
- B85 hỗ trợ Bus RAM xung nhịp 1333/1600MHz, trong khi H81 chỉ là 1333MHz
- B85 có hỗ trợ 2 tính năng độc quyền của Intel là SBA và SRT, H81 thì không
- B85 hỗ trợ 8 lanes PCI-E 2.0 (bên cạnh 16 lanes PCI-E 3.0 từ CPU), còn H81 chỉ là 6. 

<details>
    <summary>Lưu ý nhỏ:</summary>
    Chipset H81 chỉ hỗ trợ PCI-E 2.0, không phải là 3.0 như các chipset khác, cho dù CPU có hỗ trợ PCI-E 3.0 đi chăng nữa. 
</details>

Tương tự H97, B85 và H81 không được hỗ trợ mở khóa ép xung từ Intel nhưng thông qua việc cập nhật BIOS mới từ các nhà sản xuất mainboard nên chúng ta vẫn có thể ép xung được trên các mainboard sử dụng 2 nền tảng chipset này thông qua hệ số nhân CPU. Chưa hết, với BIOS mới nhất, các mainboard H81 của ASUS có khả năng chạy RAM với xung nhịp 1400MHz. -->

## 3. Cấu hình thử nghiệm

<!-- Ở phần này, tôi sẽ giữ nguyên mọi thành phần linh kiện máy tính như CPU, RAM, VGA, PSU... chỉ thay đổi ở linh kiện mainboard với 4 mainboard chipset H81, B85, H97 và Z97 cho mỗi bài test để đảm bảo công bằng. Các thông số ngoài CPU và RAM, tất cả đều giữ mặc định, riêng CPU sẽ có 2 phần mặc định và ép xung còn RAM sẽ có 3 xung nhịp bus RAM 1400MHz/1600MHz/2400MHz cho các chipset lần lượt là H81/B85, H97/Z97 nhằm để làm rõ vai trò của RAM liệu có ảnh hưởng nhiều tới hiệu năng tổng thể hay không?


Dưới đây là cấu hình chi tiết, 4 mainboard đại diện cho 4 chipset H81, B85, H97 và Z97 sẽ là H81M-D, B85-Vanguard, H97-Pro và Z97 Maximus VII Gene từ ASUS. -->

!["Cấu hình thử nghiệm gồm:"](https://farm9.staticflickr.com/8723/17044488310_159941477c_z.jpg "Cấu hình thử nghiệm chi tiết")

**Lưu ý**: **Core i7-4790k** được set ở **4.4GHz** tất cả các nhân, trên tất cả các mainboard. Riêng với mainboard thuộc chipset H81 là H81M-D thì việc này không thực hiện được, vì thế trên bo mạch chủ này tác giả quyết định **OC lên 4.6GHz** chứ không test mặc định nữa.

<!-- Tham khảo link này cho mục cấu hình: https://tinhte.vn/thread/danh-gia-cpu-amd-ryzen-9-3900x-hieu-nang-qua-xuat-sac-cho-muc-gia-13-trieu-ap-dao-core-i9-9900k.2983145/#menuid1 -->

## 4. Các bài test hiệu năng và kết quả
Dưới đây là các bài test hiệu năng để thử nghiệm các mainboard với Core i7-4790K:
- Benchmark
    - 3DMark 11 Extreme/FireStrike/Sky Diver
    - AIDA64 CPU Queen/Memory and Cache Benchmark
    - Cinebench R11.5/R15
    - Wprime 1.55
    - 3DSMax 2013 Vray Rendering
    - SuperPi 32M
    - Frybench x64
    - Passmark Performance Test
    - WinRAR Single/Multi-thread
- Game: 
    - GRID Autosport (Max Settings/MSAA 8x/VSync: OFF/1080p)
    - Metro Last Light (Max Settings/Advanced Physics: ON/VSync: OFF/1080p)
    - Tomb Raider 2014 (Ultimate Settings/VSync: OFF/1080p)


##### Round 1: Test lấy kết quả khi xung nhịp CPU i7-4790K được set 4.4GHz bằng thông số Turbo Boost, riêng trên bo mạch chủ H81M-D là 4.6GHz.​

!["Điểm 3DMark"](https://diendan.amtech.vn/attachments/3dmark-png.46132/ "Điểm 3DMark")

!["Điểm AIDA64"](https://diendan.amtech.vn/attachments/aida64-png.46133/ "Điểm AIDA64")

!["Điểm Cinebench"](https://diendan.amtech.vn/attachments/cinebench-png.46134/ "Điểm Cinebench")

!["Thời gian tính toán"](https://diendan.amtech.vn/attachments/cpu-png.46135/ "Thời gian tính toán")

!["Các bài benchmark còn lại"](https://diendan.amtech.vn/attachments/other-png.46137/ "Các bài benchmark còn lại")

!["Hiệu năng game"](https://diendan.amtech.vn/attachments/game-png.46136/ "Hiệu năng game")

Có thể nói, ở mức mặc định xung Turbo Boost 4.4GHz, cả 3 bo mạch chủ B85 Vanguard, H97 Pro và Z97 Maximus VII Gene có điểm số hiệu năng gần như cân bằng nhau trong hầu hết các bài test (ngoại trừ bài test RAM và Cache của AIDA64) dù mức xung RAM của cả 3 đều set ở các mức khác nhau (với B85/H97 là 1600MHz còn Z97 là 2400MHz). Chứng tỏ rằng vai trò của RAM khi sử dụng thực tế không thực sự nổi bật, nếu không muốn nói là nó có phần chìm hẳn so với CPU. Còn riêng với H81M-D thì điểm số của nó ở vài bài test cao hơn cả 3 bo mạch chủ còn lại, chẳng qua là do CPU của nó được tôi ép xung lên 4.6GHz mà thôi. Vì thế, có thể khẳng định vai trò của CPU trong sử dụng thực tế là cực kỳ quan trọng trong việc ảnh hưởng đến hiệu năng hoạt động của hệ thống. 

Tuy nhiên ở phần test game, dù là CPU đang ở 4.4GHz hay 4.6GHz thì cả 4 bo mạch chủ đều cho kết quả xấp xỉ bằng nhau. Có thể giải thích được rằng vai trò chính yếu của CPU trong game đã được chuyển sang VGA khi game lấy năng lực xử lý của VGA để làm nền tảng. Tất nhiên sẽ có nhiều game chủ yếu dùng CPU để làm nền tảng như các game chiến thuật thời gian thực RTS (StarCraft 2, Total War Shogun, City XXL...), game hành động sandbox nhiều đối tượng xuất hiện trên màn hình (GTA V, Sleeping Dogs, Just Cause 2...). Tuy nhiên số lượng đầu game như thế vẫn là con số khá nhỏ trong bức tranh toàn thể về thế giới game, số các đầu game luôn lấy tài nguyên VGA làm trọng vẫn chiếm phần lớn hơn.

##### Round 2: Test lấy kết quả khi xung nhịp CPU i7-4790K được ép xung lên mức 4.7GHz với bo mạch chủ Z97 Maximus VII Gene và 4.6GHz với các bo mạch chủ còn lại.​

!["Điểm 3DMark"](https://diendan.amtech.vn/attachments/3dm-png.46139/ "Điểm 3DMark")

!["Điểm AIDA64"](https://diendan.amtech.vn/attachments/aida-png.46140/ "Điểm AIDA64")

!["Điểm Cinebench"](https://diendan.amtech.vn/attachments/cine-png.46141/ "Điểm Cinebench")

!["Thời gian tính toán"](https://diendan.amtech.vn/attachments/cpu-png.46135/ "Thời gian tính toán")

!["Các bài benchmark còn lại"](https://diendan.amtech.vn/attachments/other-png.46144/ "Các bài benchmark còn lại")

!["Hiệu năng game"](https://diendan.amtech.vn/attachments/game-png.46143/ "Hiệu năng game")

Chuyển qua phần ép xung, đến đây bo mạch chủ Z97 sẽ phát huy thế mạnh ép xung CPU của mình khi hầu hết các bài test đều cho kết quả có lợi cho Maximus VII Gene khi chạy i7-4790K với mức xung 4.7GHz. Trong khi đó, 3 bo mạch chủ còn lại vốn không được thiết kế dành cho ép xung CPU nên chỉ với mức xung 4.6GHz chúng thua gần như toàn bộ các bài test khi so với Maximus VII Gene. 

Ở bài test game, kết quả vẫn không thay đổi nhiều so với mặc định khi ở phần test này, sức mạnh của VGA sẽ quyết định kết quả.

(Hết P1).