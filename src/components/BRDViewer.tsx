
import React, { useState } from 'react';
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
  const [activeSection, setActiveSection] = useState('overview');

  const handleBack = () => {
    navigate('/');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const sections = [
    { id: 'overview', title: 'Tổng quan', icon: Eye },
    { id: 'userflow', title: 'User Flow', icon: Users },
    { id: 'screens', title: 'Chi tiết màn hình', icon: Smartphone },
    { id: 'features', title: 'Tính năng', icon: Settings },
    { id: 'testing', title: 'Test Cases', icon: CheckCircle }
  ];

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

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1 print:hidden">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Mục lục</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <motion.button
                        key={section.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{section.title}</span>
                      </motion.button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-6 w-6" />
                        Tổng quan sản phẩm
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">7</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Màn hình chính</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">5</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Test scenarios</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">3</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Phương thức xác thực</div>
                        </div>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <h3>Mục tiêu</h3>
                        <p>
                          SuperApp là ứng dụng ngân hàng hiện đại cung cấp trải nghiệm đăng ký và quản lý tài khoản 
                          thông qua các phương thức xác thực sinh trắc học tiên tiến.
                        </p>
                        
                        <h3>Đối tượng người dùng</h3>
                        <ul>
                          <li>Khách hàng cá nhân muốn mở tài khoản ngân hàng</li>
                          <li>Khách hàng hiện tại muốn quản lý thông tin cá nhân</li>
                          <li>Người dùng quan tâm đến bảo mật sinh trắc học</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* User Flow Section */}
              {activeSection === 'userflow' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Luồng người dùng (User Flow)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userFlowSteps.map((step, index) => (
                          <div key={step.step} className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {step.step}
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{step.description}</p>
                            </div>
                            {index < userFlowSteps.length - 1 && (
                              <div className="flex-shrink-0 w-px h-8 bg-gray-300 dark:bg-gray-600 ml-4 mt-8"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Screens Section */}
              {activeSection === 'screens' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-6 w-6" />
                        Chi tiết các màn hình
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {screenDetails.map((screen, index) => {
                          const Icon = screen.icon;
                          return (
                            <motion.div
                              key={screen.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                  <Icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-grow">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">{screen.name}</h3>
                                    <Badge variant="outline" className="text-xs">
                                      {screen.file}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 mb-3">{screen.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {screen.features.map((feature) => (
                                      <Badge key={feature} variant="secondary" className="text-xs">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Features Section */}
              {activeSection === 'features' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-6 w-6" />
                        Tính năng chính
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Bảo mật & Xác thực
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Face ID authentication
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Touch ID authentication
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              VNeID integration
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              NFC verification
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Quản lý người dùng
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Profile management
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Device management
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Security controls
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Feature authorization
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Testing Section */}
              {activeSection === 'testing' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6" />
                        Test Cases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {testCases.map((testCase, index) => (
                          <motion.div
                            key={testCase.phone}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                                {testCase.phone}
                              </code>
                              <span className="text-sm">{testCase.scenario}</span>
                            </div>
                            <div>
                              {testCase.status === 'success' && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Success
                                </Badge>
                              )}
                              {testCase.status === 'warning' && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Warning
                                </Badge>
                              )}
                              {testCase.status === 'error' && (
                                <Badge className="bg-red-100 text-red-800">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Error
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BRDViewer;
