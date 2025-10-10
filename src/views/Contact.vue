<template>
  <div class="px-4 py-6 max-w-2xl mx-auto">
    <!-- 头部导航 -->
    <div class="mb-6">
      <button @click="$router.push('/dashboard')" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        返回仪表板
      </button>
    </div>

    <!-- 联系页面标题 -->
    <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-md border border-purple-100 p-6 mb-8">
      <h1 class="text-2xl font-bold text-purple-900 mb-2">问题反馈 & 交流</h1>
      <p class="text-gray-600">如有任何问题、建议或合作意向，请通过以下方式联系我们</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 联系方式 -->
      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">联系方式</h2>
        <div class="space-y-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-purple-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <div>
              <h3 class="font-medium text-gray-900">电子邮件</h3>
              <p class="text-gray-600">support@appmarket-dashboard.com</p>
            </div>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-purple-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
            <div>
              <h3 class="font-medium text-gray-900">反馈渠道</h3>
              <p class="text-gray-600">GitHub Issues</p>
            </div>
          </div>
          <div class="flex items-start">
            <svg class="w-5 h-5 text-purple-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <div>
              <h3 class="font-medium text-gray-900">项目地址</h3>
              <p class="text-gray-600">github.com/example/appmarket-dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 反馈表单 -->
      <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">提交反馈</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="feedbackName" class="block text-sm font-medium text-gray-700 mb-1">您的姓名/昵称</label>
            <input
              type="text"
              id="feedbackName"
              v-model="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="请输入您的姓名或昵称"
            >
          </div>
          <div>
            <label for="feedbackEmail" class="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
            <input
              type="email"
              id="feedbackEmail"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="请输入您的邮箱地址（选填）"
            >
          </div>
          <div>
            <label for="feedbackType" class="block text-sm font-medium text-gray-700 mb-1">反馈类型</label>
            <select
              id="feedbackType"
              v-model="feedbackType"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="bug">功能错误</option>
              <option value="suggestion">功能建议</option>
              <option value="data">数据问题</option>
              <option value="cooperation">合作意向</option>
              <option value="other">其他问题</option>
            </select>
          </div>
          <div>
            <label for="feedbackContent" class="block text-sm font-medium text-gray-700 mb-1">反馈内容</label>
            <textarea
              id="feedbackContent"
              v-model="content"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="请详细描述您的问题或建议..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-md hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
          >
            <span v-if="loading" class="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ loading ? '提交中...' : '提交反馈' }}
          </button>
        </form>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">常见问题</h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-medium text-gray-900 mb-1">如何报告错误的数据？</h3>
          <p class="text-gray-600 pl-6">您可以通过反馈表单提交错误数据报告，选择"数据问题"类型，并详细说明应用名称、错误数据项及正确值（如有）。</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-1">多久会回复我的反馈？</h3>
          <p class="text-gray-600 pl-6">我们通常会在1-3个工作日内回复您的反馈。对于紧急问题，建议通过电子邮件直接联系我们。</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-1">可以申请添加特定功能吗？</h3>
          <p class="text-gray-600 pl-6">当然可以！请在反馈表单中选择"功能建议"类型，详细描述您希望添加的功能及使用场景，我们会认真考虑每一项建议。</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-1">如何申请合作？</h3>
          <p class="text-gray-600 pl-6">请在反馈表单中选择"合作意向"类型，或直接发送电子邮件至support@appmarket-dashboard.com，详细说明您的合作需求。</p>
        </div>
      </div>
    </div>

    <!-- 提交成功提示 -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">提交成功！</h3>
        <p class="text-gray-600 mb-6">感谢您的反馈，我们会尽快处理并回复。</p>
        <button
          @click="showSuccess = false"
          class="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 状态定义
const name = ref('');
const email = ref('');
const feedbackType = ref('bug');
const content = ref('');
const loading = ref(false);
const showSuccess = ref(false);

// 处理表单提交
const handleSubmit = async () => {
  if (!content.value.trim()) return;
  
  try {
    loading.value = true;
    
    // 构建提交数据
    const feedbackData = {
      name: name.value.trim(),
      email: email.value.trim(),
      type: feedbackType.value,
      content: content.value.trim(),
      timestamp: new Date().toISOString()
    };
    
    // 模拟API请求
    console.log('提交反馈:', feedbackData);
    
    // 实际项目中发送请求
    // const response = await fetch('/api/feedback', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(feedbackData)
    // });
    
    // 显示成功提示
    showSuccess.value = true;
    
    // 重置表单
    name.value = '';
    email.value = '';
    content.value = '';
  } catch (error) {
    console.error('提交反馈失败:', error);
    alert('提交失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
select, input, textarea {
  transition: border-color 0.2s ease-in-out;
}

select:focus, input:focus, textarea:focus {
  border-color: #9333ea;
  box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.2);
}
</style>