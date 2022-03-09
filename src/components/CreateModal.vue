<template>
  <div>
    <a-button type="primary" @click="showModal">チケット作成</a-button>
    <a-modal
      v-model:visible="visible"
      title="チケット作成"
      @ok="createTicket();"
      width="800px"
      ok-text="確定"
      cancel-text="キャンセル"
    >
      {{ formState }}
      <div class="d-flex justify-content-center">
        <div class="alert" :class="submitStatus" role="alert">{{ message }}</div>
      </div>
      <a-form ref="formRef" :model="formState" v-bind="formItemLayout" :rules="rules">
        <a-form-item name="date" label="日付">
          <a-date-picker
            v-model:value="formState['date']"
            show-time
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
          />
        </a-form-item>

        <a-form-item name="category" label="カテゴリ">
          <a-select v-model:value="formState.category.id" placeholder="チケットのカテゴリ">
            <a-select-option
              :value="id"
              v-for="category in ticketCategories"
              :key="category.id"
            >{{ category.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="staff" label="スタッフ名">
          <a-select v-model:value="formState.staff.id" placeholder="Your name">
            <a-select-option :value="id" v-for="staff in staffName" :key="staff.id">{{ staff.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="store" label="店舗名">
          <a-select v-model:value="formState.store.id" placeholder="Store name">
            <a-select-option
              :value="id"
              v-for="store in storeNames"
              :key="store.id"
            >{{ store.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item name="inquiry" label="問合せ内容">
          <a-textarea v-model:value="formState.inquiry" />
        </a-form-item>

        <a-form-item name="respond" label="対応内容">
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
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { ref, reactive, toRaw } from 'vue';
import EventService from '@/plugins/EventService';

export default ({
  setup() {
    // ModalSetup
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
      message.value = "フォームを記入してください。";
      submitStatus.value = "alert-primary";
      formRef.value.resetFields();
    };

    // Form Setup
    let message = ref("");
    let submitStatus = ref("");
    const staffName = ref(null);
    const storeNames = ref(null);
    const ticketCategories = ref(null);
    const formRef = ref([]);

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const formState = reactive({
      date: '',
      status: true,
      inquiry: 'Hi',
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

    const rules = {
      date: [
        {
          required: true,
          message: '日にちを選択してください。',
        },
      ],
      inquiry: [
        {
          required: true,
          message: '問い合わせ内容を記入してください。',
        },
      ],
      respond: [
        {
          required: true,
          message: '対応内容を記入してください。',
        },
      ],
      phone: [
        {
          required: true,
          message: 'お客様電話番号を数字のみで記入してください。',
          trigger: 'blur',
          type: 'number'
        },
      ],
      contact_name: [
        {
          required: true,
          message: 'お客様氏名を記入してください。',
        },
      ],
      category: [
        {
          required: true,
          message: '問い合わせカテゴリを記入してください。',
          // trigger: 'blur'
        },
      ],
      staff: [
        {
          required: true,
          message: 'スタッフ名を選択してください。',
          // trigger: 'change'
        },
      ],
      store: [
        {
          required: true,
          message: '店舗名を選択してください。',
          // trigger: 'change'
        },
      ],
    };

    const getStaffName = () => {
      EventService.getStaffName()
        .then((response) => {
          staffName.value = response.data;
        })
    }

    const getTicketCategories = () => {
      EventService.getTicketCategories()
        .then((response) => {
          ticketCategories.value = response.data;
        })
    }

    const getStoreName = () => {
      EventService.getStoreName()
        .then((response) => {
          storeNames.value = response.data;
        })
    }

    const createTicket = () => {
      EventService.postTicket(toRaw(formState))
        .then((response) => {
          console.log("FORM" + formState)
          console.log("success!" + response.data);
          submitStatus.value = "alert-success";
          formRef.value.resetFields();
          visible.value = false;
        })
        .catch((error) => {
          console.log(error);
          console.log("FORM" + formState)
          message.value = "フォームに不備があるようです。"
          submitStatus.value = "alert-danger"
        });
    }

    getStaffName();
    getTicketCategories();
    getStoreName();

    return {
      // Modal
      visible,
      showModal,
      // Form
      formState,
      rules,
      formItemLayout,
      formRef,
      staffName, //dropdown
      ticketCategories, //dropdown
      storeNames, //dropdown
      message,
      submitStatus,
      createTicket,
    };
  },
});
</script>

<style>
.alert {
  width: 400px;
}
</style>