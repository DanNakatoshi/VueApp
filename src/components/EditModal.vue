<template>
  <div>
    <a-button type="warning" @click="showModal" class="mx-3">編集</a-button>
    <a-modal
      v-model:visible="visible"
      title="このデータを編集してください。"
      ok-text="確定"
      cancel-text="キャンセル"
      @ok="updateTicket();"
      width="800px"
    >
      <a-form ref="formRef" :model="formState" v-bind="formItemLayout" :rules="rules">
        <a-form-item name="date" label="日付">
          <a-date-picker
            v-model:value="formState['date']"
            show-time
            format="MM/DD/YYYY HH:mm"
            value-format="MM/DD/YYYY HH:mm"
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
      <div v-if="error" class="alert alert-success" role="alert">削除できました</div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRaw } from 'vue';
import EventService from '@/plugins/EventService';

export default defineComponent({
  props: [
    "record",
    "submitDelete",
    "title",
  ],
  setup(props) {
    const submitted = ref(false);
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const hideModal = () => {
      visible.value = false;
    };

    const subimitted = async () => {
      submitted.value = true;
      setTimeout(() => {
        visible.value = false;
      }, 1500);
    }

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    // const message = ref("")

    const formState = reactive({
      date: props.record.date,
      status: props.record.status,
      inquiry: props.record.inquiry,
      respond: props.record.respond,
      contact_name: props.record.contact_name,
      email: props.record.email,
      phone: props.record.phone,
      escalated: props.record.escalated,
      category: {
        id: props.record.category.id
      },
      store: {
        id: props.record.store.id
      },
    });

    // const staffName = ref(null);
    const storeNames = ref(null);
    const ticketCategories = ref(null);
    // const formRef = ref([]);


    // const getStaffName = async () => {
    //   await EventService.getStaffName()
    //     .then((response) => {
    //       staffName.value = response.data;
    //     })
    // }

    const getTicketCategories = async () => {
      EventService.getTicketCategories()
        .then((response) => {
          ticketCategories.value = response.data;
        })
    }


    const getStoreName = async () => {
      EventService.getStoreName()
        .then((response) => {
          storeNames.value = response.data;
        })
    }

    const updateTicket = () => {
      const id = ref(props.record.id)
      EventService.updateTicket(id.value, toRaw(formState))
        .then((response) => {
          console.log(response.data);
          visible.value = false;
        })
        .catch((error) => {
          console.log(error.response)
        })
    }

    // getStaffName()
    getTicketCategories()
    getStoreName()

    return {
      submitted,
      visible,
      formItemLayout,
      showModal,
      hideModal,
      subimitted,
      formState,
      ticketCategories, //dropdown
      storeNames, //dropdown
      updateTicket,
      // formRef,
    };
  },
});
</script>