
# Business Requirements Document (BRD)
## SuperApp - Modern Banking Experience

### Phiên bản: 1.0
### Ngày: 29/05/2025

---

## 1. TỔNG QUAN SẢN PHẨM

### 1.1 Mục tiêu
SuperApp là ứng dụng ngân hàng hiện đại cung cấp trải nghiệm đăng ký và quản lý tài khoản thông qua các phương thức xác thực sinh trắc học tiên tiến.

### 1.2 Đối tượng người dùng
- Khách hàng cá nhân muốn mở tài khoản ngân hàng
- Khách hàng hiện tại muốn quản lý thông tin cá nhân
- Người dùng quan tâm đến bảo mật sinh trắc học

---

## 2. LUỒNG NGƯỜI DÙNG (USER FLOW)

### 2.1 Luồng chính
```
Màn hình chính → Đăng ký/Đăng nhập → Xác thực OTP → Lựa chọn xác minh → 
VNeID/NFC → Xác thực sinh trắc học → Hoàn tất đăng ký → Quản lý hồ sơ
```

### 2.2 Các trường hợp sử dụng
1. **Khách hàng mới**: Đăng ký → OTP → Xác minh danh tính → Sinh trắc học → Hoàn tất
2. **Khách hàng cũ có sinh trắc học**: Đăng nhập → Face ID/Touch ID → Quản lý hồ sơ
3. **Khách hàng cũ chưa có sinh trắc học**: Đăng nhập → Thiết lập sinh trắc học
4. **Xác minh thất bại**: Hướng dẫn đến chi nhánh

---

## 3. CHI TIẾT CÁC MÀN HÌNH

### 3.1 Màn hình chính (Home Screen)
**File**: `src/components/HomeScreen.tsx`

#### Thông tin hiển thị:
- **Header**: Logo SuperApp với animation
- **Tiêu đề**: "SuperApp - Modern Banking Experience"
- **Nút chính**: "Register Now" (màu đỏ gradient)
- **Phần đăng nhập**: 
  - Face ID button với icon người dùng
  - Touch ID button với icon vân tay
- **Menu hỗ trợ**: Guide, Support, FAQ

#### Chức năng:
- Điều hướng đến đăng ký
- Xác thực sinh trắc học với animation
- Truy cập hỗ trợ và hướng dẫn

#### Animation:
- Pulsating effect cho nút đăng ký
- Face ID scanning animation với khung quét
- Touch ID scanning với hiệu ứng vân tay

---

### 3.2 Màn hình đăng ký (Registration Flow)
**File**: `src/components/RegistrationFlow.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "Customer Registration"
- **Form nhập liệu**:
  - Label: "Phone Number"
  - Input field với validation
  - Placeholder: "Please enter your phone number"
- **Nút hành động**: "Next" (disabled khi chưa valid)
- **Nút phụ**: "Cancel"

#### Validation:
- Số điện thoại phải bắt đầu bằng 0
- Độ dài: 10 số
- Chỉ cho phép số

#### Test cases được hỗ trợ:
- `0123456789`: Khách hàng mới, CCCD mới
- `0223456789`: Khách hàng mới, CCCD đã tồn tại
- `0323456789`: Khách hàng cũ, xác minh sinh trắc học thất bại
- `0423456789`: Khách hàng cũ, xác minh sinh trắc học thành công
- `0523456789`: Khách hàng cũ, chưa có sinh trắc học

---

### 3.3 Màn hình xác thực OTP
**File**: `src/components/OtpVerification.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "Enter OTP Code"
- **Mô tả**: "We sent a 6-digit code to [phone number]"
- **OTP Input**: 6 ô nhập số
- **Timer**: Đếm ngược thời gian
- **Nút**: "Resend OTP" (khi hết thời gian)
- **Nút chính**: "Verify"

#### Logic xử lý:
- Auto-submit khi nhập đủ 6 số
- Điều hướng dựa trên trạng thái khách hàng

---

### 3.4 Màn hình lựa chọn xác minh
**File**: `src/components/VerificationOptions.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "Choose Verification Method"
- **Option 1**: VNeID Verification
  - Icon: Smartphone
  - Mô tả: "Verify your identity using the VNeID app"
- **Option 2**: ID Card NFC
  - Icon: CreditCard
  - Mô tả: "Scan your physical ID card via NFC"

#### Chức năng:
- Điều hướng đến VNeID hoặc NFC verification
- Hover effects với motion

---

### 3.5 Màn hình xác minh VNeID
**File**: `src/components/VNeIDConfirmation.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "VNeID Identity Verification"
- **Mô tả**: Hướng dẫn sử dụng VNeID app
- **Steps**:
  1. Open VNeID app
  2. Scan QR code
  3. Follow authentication process
- **QR Code**: Placeholder cho mã QR
- **Nút**: "I've completed VNeID verification"

---

### 3.6 Màn hình xác minh NFC
**File**: `src/components/NfcVerification.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "NFC Identity Verification"
- **Icon**: NFC symbol với animation
- **Hướng dẫn**: 
  - "Place your ID card near the device"
  - "Keep the card steady during scanning"
- **Status**: "Scanning..." với progress

---

### 3.7 Màn hình xác thực sinh trắc học
**File**: `src/components/BiometricAuth.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "Biometric Authentication"
- **Camera preview**: Khung để chụp ảnh
- **Hướng dẫn**: "Look directly at the camera"
- **Nút**: "Capture" và "Retake"

#### Xử lý kết quả:
- Thành công: Chuyển đến màn hình tiếp theo
- Thất bại: Chuyển đến VerificationFailure

---

### 3.8 Màn hình xác minh thất bại
**File**: `src/components/VerificationFailure.tsx`

#### Thông tin hiển thị:
- **Icon**: AlertCircle (màu đỏ) với animation
- **Tiêu đề**: "Verification Failed"
- **Mô tả**: "Facial verification was not matched"
- **Thông báo**: "Unable to Verify Identity"
- **Hướng dẫn**: "Please visit your nearest bank branch..."
- **Cảnh báo**: Auto redirect về home sau 10 giây
- **Nút**: "Return to Home"

---

### 3.9 Màn hình đăng ký chi tiết
**File**: `src/components/DetailedRegistration.tsx`

#### Form thông tin:
- **Personal Information**:
  - Full name
  - Date of birth
  - Gender
  - Address
- **Contact Information**:
  - Email
  - Phone confirmation
- **Employment Information**:
  - Occupation
  - Monthly income
  - Company name

---

### 3.10 Màn hình điều khoản
**File**: `src/components/TermsAndConditions.tsx`

#### Thông tin hiển thị:
- **Tiêu đề**: "Terms and Conditions"
- **Nội dung**: Điều khoản sử dụng dịch vụ
- **Checkbox**: "I agree to the terms and conditions"
- **Nút**: "Accept and Continue"

---

### 3.11 Màn hình hoàn tất đăng ký
**File**: `src/components/RegistrationComplete.tsx`

#### Thông tin hiển thị:
- **Icon**: CheckCircle (màu xanh) với animation
- **Tiêu đề**: "Registration Complete"
- **Thông báo thành công**
- **Thông tin tài khoản**: Account number
- **Nút**: "Go to Profile Management"

---

### 3.12 Màn hình quản lý hồ sơ
**File**: `src/components/ProfileManagement.tsx`

#### Thông tin hiển thị:
- **Header**: Thông tin người dùng với CCCD
- **Tabs navigation**:
  - Biometric (Scan icon)
  - Devices (Fingerprint icon)  
  - Security (Shield icon)
  - Permissions (Settings icon)

#### Tab Biometric:
- Cấu hình Face ID/Touch ID
- Trạng thái kích hoạt
- Cài đặt nhạy cảm

#### Tab Devices:
- Danh sách thiết bị đã đăng ký
- Quản lý thiết bị tin cậy
- Xóa thiết bị

#### Tab Security:
- Thay đổi mật khẩu
- Cài đặt bảo mật 2FA
- Lịch sử đăng nhập

#### Tab Permissions:
- Quyền truy cập tính năng
- Cài đặt thông báo
- Quyền riêng tư

---

## 4. TÍNH NĂNG HỖ TRỢ

### 4.1 Màn hình hỗ trợ (Support)
**File**: `src/components/Support.tsx`
- Thông tin liên hệ
- Form gửi yêu cầu hỗ trợ
- Live chat

### 4.2 Màn hình hướng dẫn (User Guide)
**File**: `src/components/UserGuide.tsx`
- Video tutorials
- Step-by-step guides
- FAQ nhanh

### 4.3 Màn hình FAQ
**File**: `src/components/Faq.tsx`
- Câu hỏi thường gặp
- Tìm kiếm câu hỏi
- Categories

---

## 5. THIẾT KẾ VÀ UX/UI

### 5.1 Design System
- **Colors**: Banking blue theme (#3B82F6), Red accent (#EF4444)
- **Typography**: Font system của Tailwind
- **Spacing**: 4px grid system
- **Shadows**: Subtle elevation với blur

### 5.2 Animations
- **Framer Motion**: Smooth transitions
- **Micro-interactions**: Button hover states
- **Loading states**: Scanning animations
- **Page transitions**: Fade in/out

### 5.3 Responsive Design
- Mobile-first approach
- Max width containers
- Touch-friendly buttons
- Optimized for iOS/Android

---

## 6. TECHNICAL REQUIREMENTS

### 6.1 Frontend Stack
- **Framework**: React với TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### 6.2 State Management
- **Local State**: React useState/useEffect
- **Navigation State**: React Router state
- **Form Validation**: Custom validation logic

### 6.3 Security Features
- **Biometric Authentication**: Face ID/Touch ID simulation
- **Data Protection**: Encrypted local storage
- **Session Management**: Auto logout
- **Audit Trail**: Action logging

---

## 7. TESTING SCENARIOS

### 7.1 Happy Path
1. Người dùng mới đăng ký thành công
2. Khách hàng cũ đăng nhập bằng sinh trắc học
3. Xác minh VNeID/NFC thành công

### 7.2 Error Handling
1. Số điện thoại không hợp lệ
2. OTP sai hoặc hết hạn
3. Xác minh sinh trắc học thất bại
4. Network errors

### 7.3 Edge Cases
1. Thiết bị không hỗ trợ camera
2. Quyền truy cập bị từ chối
3. Session timeout
4. Multiple device login

---

## 8. FUTURE ENHANCEMENTS

### 8.1 Phase 2 Features
- Real biometric integration
- Backend API integration
- Push notifications
- Offline mode

### 8.2 Advanced Features
- AI-powered fraud detection
- Voice authentication
- Blockchain integration
- Multi-language support

---

## 9. APPENDIX

### 9.1 File Structure
```
src/
├── components/
│   ├── HomeScreen.tsx
│   ├── RegistrationFlow.tsx
│   ├── OtpVerification.tsx
│   ├── VerificationOptions.tsx
│   ├── VNeIDConfirmation.tsx
│   ├── VerificationFailure.tsx
│   ├── ProfileManagement.tsx
│   └── profile/
│       ├── BiometricConfig.tsx
│       ├── DeviceManagement.tsx
│       ├── SecurityControls.tsx
│       └── FeatureAuthorization.tsx
└── App.tsx
```

### 9.2 Dependencies
- React 18.3.1
- React Router DOM 6.26.2
- Framer Motion 10.18.0
- Tailwind CSS + Shadcn/UI
- Lucide React 0.462.0

---

*Tài liệu này mô tả chi tiết các yêu cầu nghiệp vụ cho SuperApp Banking Application phiên bản 1.0*
