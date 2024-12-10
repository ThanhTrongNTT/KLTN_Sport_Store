package hcmute.nhom.kltn.controller.v1;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import hcmute.nhom.kltn.common.payload.ApiResponse;
import hcmute.nhom.kltn.dto.order.OrderDTO;
import hcmute.nhom.kltn.payment.momo.MomoService;

/**
 * Class PaymentController.
 *
 * @author: ThanhTrong
 **/
@RestController
public class PaymentController extends AbstractController {

    @Autowired
    private MomoService momoService;

    @PostMapping("/momo")
    public ResponseEntity<ApiResponse<String>> initiateMoMoPayment(
            HttpServletRequest request,
            @RequestBody OrderDTO orderDTO
            ) {
        String paymentUrl = momoService.createMoMoPaymentRequest(orderDTO);
        return ResponseEntity.ok( ApiResponse.<String>builder()
                .result(true)
                .code(HttpStatus.OK.toString())
                .data(paymentUrl)
                .message("Payment url momo!")
                .build());
    }

    @PostMapping("/momo-ipn")
    public ResponseEntity<String> handleMoMoIpn(HttpServletRequest request) {
        // Lấy các tham số từ MoMo gửi về (thông qua request)
        String signature = request.getParameter("signature");
        String orderId = request.getParameter("orderId");
        String paymentStatus = request.getParameter("paymentStatus");

        // Kiểm tra chữ ký và kết quả giao dịch
        // Xử lý kết quả giao dịch ở đây (Cập nhật trạng thái đơn hàng, gửi email thông báo cho người dùng,...)

        return ResponseEntity.ok("OK");
    }


}
