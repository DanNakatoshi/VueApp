<template>
  {{ formRef }}
  <div class="d-flex justify-content-center">
    <div class="alert" :class="submitStatus" role="alert">{{ message }}</div>
  </div>
  <a-form
    ref="formRef"
    :model="formState"
    name="validate_other"
    v-bind="formItemLayout"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
  >
    <a-form-item name="date" label="日付" v-bind="config">
      <a-date-picker
        v-model:value="formState['date']"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>

    <a-form-item
      name="category"
      label="カテゴリ"
      has-feedback
      :rules="[{ required: true, message: 'カテゴリを選択してください。' }]"
    >
      <a-select v-model:value="formState.category.id" placeholder="チケットのカテゴリ">
        <a-select-option
          :value="id"
          v-for="category in ticketCategories"
          :key="category.id"
        >{{ category.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      name="staff"
      label="スタッフ名"
      has-feedback
      :rules="[{ required: true, message: 'スタッフ名を選択してください。' }]"
    >
      <a-select v-model:value="formState.staff.id" placeholder="Your name">
        <a-select-option :value="id" v-for="staff in staffName" :key="staff.id">{{ staff.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      name="store"
      label="店舗名"
      has-feedback
      :rules="[{ required: true, message: '店舗名を選択してください。' }]"
    >
      <a-select v-model:value="formState.store.id" placeholder="Store name">
        <a-select-option :value="id" v-for="store in storeNames" :key="store.id">{{ store.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item
      :name="inquiry"
      label="問合せ内容"
      has-feedback
      :rules="[{ required: true, message: '問合せ内容を記入してください。' }]"
    >
      <a-textarea v-model:value="formState.inquiry" />
    </a-form-item>

    <a-form-item
      :name="respond"
      label="対応内容"
      has-feedback
      :rules="[{ required: true, message: '対応内容を記入してください。' }]"
    >
      <a-textarea v-model:value="formState.respond" />
    </a-form-item>

    <a-form-item name="status" label="対応完了したか">
      <a-radio-group v-model:value="formState['status']">
        <a-radio :value="false">未完了（オープン）</a-radio>
        <a-radio :value="true">完了（クローズ）</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="お客様氏名" name="contact_name">
      <a-input v-model:value="formState.contact_name" />
    </a-form-item>

    <a-form-item label="お客様メールアドレス" name="email">
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item label="お客様電話番号" name="phone">
      <a-input v-model:value="formState.phone" />
    </a-form-item>

    <a-form-item name="escalated" label="上司報告が必要か">
      <a-radio-group v-model:value="formState['escalated']">
        <a-radio :value="true">報告済み</a-radio>
        <a-radio :value="false">報告不要</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit" @click.prevent="createTicket">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
// import { defineComponent, reactive, toRaw } from 'vue';
import EventService from '@/plugins/EventService';

export default defineComponent({
  // data() {
  //   return {
  //     staffName: [],
  //     ticketCategories: [],
  //     storeNames: [],
  //     message: "フォームを記入しましょう。",
  //     submitStatus: "alert-primary",
  //   }
  // },
  setup() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const formRef = ref();

    const formState = reactive({
      date: '',
      status: true,
      inquiry: '',
      respond: '',
      contact_name: '',
      email: '',
      phone: '',
      escalated: false,
      category: {
        id: ''
      },
      staff: {
        id: ''
      },
      store: {
        id: ''
      },
    });

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      formRef,
      staffName: [],
      ticketCategories: [],
      storeNames: [],
      message: "フォームを記入しましょう。",
      submitStatus: "alert-primary",
    };
  },
  created() {
    EventService.getStaffName()
      .then((response) => {
        this.staffName = response.data;
      })
      .catch((error) => {
        console.log("getStaffName():Error" + error.response);
      });
    EventService.getTicketCategories()
      .then((response) => {
        this.ticketCategories = response.data;
      })
      .catch((error) => {
        console.log("getTicketCategories():Error" + error.response);
      });
    EventService.getStoreName()
      .then((response) => {
        this.storeNames = response.data;
      })
      .catch((error) => {
        console.log("getStoreName():Error" + error.response);
      });
  },
  methods: {
    async createTicket() {
      await EventService.postTicket(this.formState)
        .then((response) => {
          console.log("success!" + response.data);
          this.message = "フォームの提出が完了しました。";
          this.submitStatus = "alert-success";
          this.formRef.value.resetFields();

        })
      // .catch((error) => {
      //   console.log("Error" + error.response);
      //   this.message = "フォームに不備があるようです。"
      //   this.submitStatus = "alert-danger"
      // });
    },

  }

});
</script>

<style>
.alert {
  width: 400px;
}
</style>