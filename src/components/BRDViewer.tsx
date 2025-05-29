
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Users, 
  Smartphone, 
  Shield, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Phone,
  MessageSquare,
  ScanFace,
  CreditCard,
  FileText,
  User,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const BRDViewer: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const userFlowSteps = [
    { step: 1, title: 'Màn hình chính', description: 'Người dùng xem trang chủ với các tùy chọn đăng ký/đăng nhập' },
    { step: 2, title: 'Đăng ký', description: 'Nhập số điện thoại để bắt đầu quy trình đăng ký' },
    { step: 3, title: 'Xác thực OTP', description: 'Nhập mã OTP được gửi về số điện thoại' },
    { step: 4, title: 'Lựa chọn xác minh', description: 'Chọn VNeID hoặc NFC để xác minh danh tính' },
    { step: 5, title: 'Xác minh danh tính', description: 'Thực hiện xác minh qua VNeID/NFC' },
    { step: 6, title: 'Sinh trắc học', description: 'Thiết lập Face ID/Touch ID' },
    { step: 7, title: 'Hoàn tất', description: 'Truy cập profile management' }
  ];

  const screenDetails = [
    {
      name: 'Home Screen',
      file: 'HomeScreen.tsx',
      description: 'Màn hình chính với logo, nút đăng ký và các tùy chọn đăng nhập sinh trắc học',
      features: ['Logo SuperApp', 'Nút Register Now', 'Face ID/Touch ID', 'Menu hỗ trợ'],
      icon: Home
    },
    {
      name: 'Registration Flow',
      file: 'RegistrationFlow.tsx', 
      description: 'Form nhập số điện thoại với validation',
      features: ['Validation số điện thoại', 'Test cases đa dạng', 'Error handling'],
      icon: Phone
    },
    {
      name: 'OTP Verification',
      file: 'OtpVerification.tsx',
      description: 'Màn hình nhập mã OTP 6 số',
      features: ['6-digit OTP input', 'Auto-submit', 'Resend timer'],
      icon: MessageSquare
    },
    {
      name: 'Verification Options',
      file: 'VerificationOptions.tsx',
      description: 'Lựa chọn phương thức xác minh VNeID hoặc NFC',
      features: ['VNeID option', 'NFC option', 'Hover animations'],
      icon: Shield
    },
    {
      name: 'Biometric Auth',
      file: 'BiometricAuth.tsx',
      description: 'Xác thực sinh trắc học Face ID/Touch ID',
      features: ['Camera preview', 'Face scanning', 'Touch ID simulation'],
      icon: ScanFace
    },
    {
      name: 'Profile Management',
      file: 'ProfileManagement.tsx',
      description: 'Quản lý hồ sơ người dùng với tabs',
      features: ['Biometric config', 'Device management', 'Security settings'],
      icon: User
    }
  ];

  const testCases = [
    { phone: '0123456789', scenario: 'Khách hàng mới, CCCD mới', status: 'success' },
    { phone: '0223456789', scenario: 'Khách hàng mới, CCCD đã tồn tại', status: 'warning' },
    { phone: '0323456789', scenario: 'Khách hàng cũ, sinh trắc học thất bại', status: 'error' },
    { phone: '0423456789', scenario: 'Khách hàng cũ, sinh trắc học thành công', status: 'success' },
    { phone: '0523456789', scenario: 'Khách hàng cũ, chưa có sinh trắc học', status: 'warning' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleBack}>
                  <ArrowLeft size={16} className="mr-2" />
                  Quay lại
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Business Requirements Document
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SuperApp - Modern Banking Experience v1.0
                  </p>
                </div>
              </div>
              <Button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-700">
                <Download size={16} className="mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Eye className="h-8 w-8" />
                  Tổng quan sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Màn hình chính</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Test scenarios</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Phương thức xác thực</div>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none text-base">
                  <h3 className="text-xl font-semibold mb-3">Mục tiêu</h3>
                  <p className="mb-4">
                    SuperApp là ứng dụng ngân hàng hiện đại cung cấp trải nghiệm đăng ký và quản lý tài khoản 
                    thông qua các phương thức xác thực sinh trắc học tiên tiến.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Đối tượng người dùng</h3>
                  <ul className="space-y-1">
                    <li>Khách hàng cá nhân muốn mở tài khoản ngân hàng</li>
                    <li>Khách hàng hiện tại muốn quản lý thông tin cá nhân</li>
                    <li>Người dùng quan tâm đến bảo mật sinh trắc học</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Flow Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-8 w-8" />
                  Luồng người dùng (User Flow)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userFlowSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{step.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
                      </div>
                      {index < userFlowSteps.length - 1 && (
                        <div className="flex-shrink-0 w-px h-12 bg-gray-300 dark:bg-gray-600 ml-6 mt-12"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Screens Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Smartphone className="h-8 w-8" />
                  Chi tiết các màn hình
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8">
                  {screenDetails.map((screen, index) => {
                    const Icon = screen.icon;
                    return (
                      <div
                        key={screen.name}
                        className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <Icon className="h-8 w-8 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-semibold text-xl">{screen.name}</h3>
                              <Badge variant="outline" className="text-sm">
                                {screen.file}
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">{screen.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {screen.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-sm">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Settings className="h-8 w-8" />
                  Tính năng chính
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl flex items-center gap-2">
                      <Shield className="h-6 w-6" />
                      Bảo mật & Xác thực
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Face ID authentication</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Touch ID authentication</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>VNeID integration</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>NFC verification</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl flex items-center gap-2">
                      <User className="h-6 w-6" />
                      Quản lý người dùng
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Profile management</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Device management</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Security controls</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Feature authorization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Testing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CheckCircle className="h-8 w-8" />
                  Test Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testCases.map((testCase, index) => (
                    <div
                      key={testCase.phone}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono">
                          {testCase.phone}
                        </code>
                        <span>{testCase.scenario}</span>
                      </div>
                      <div>
                        {testCase.status === 'success' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Success
                          </Badge>
                        )}
                        {testCase.status === 'warning' && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Warning
                          </Badge>
                        )}
                        {testCase.status === 'error' && (
                          <Badge className="bg-red-100 text-red-800">
                            <XCircle className="h-4 w-4 mr-1" />
                            Error
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default BRDViewer;
