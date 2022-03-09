<template>
  <!-- {{ datetime }} -->
  {{ formatdate }}
  {{ timedata }}
</template>

<script>
import moment from 'moment';
import { ref } from '@vue/reactivity';

export default ({
  props: [
    "datetime"
  ],
  setup(props) {
    const timedata = ref(props.datetime);
    const formatdate = (timedata) => {
      return moment(timedata).format('MMMM Do YYYY, h:mm:ss a');
    }

    return {
      formatdate,
      timedata
    }
  },
})
</script>
