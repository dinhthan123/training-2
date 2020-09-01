<template>
    <div>
        <modal :show="show" @close="close">
           
        </modal>
    </div>
</template>

<script>
    import Modal from '../../components/users/Modal.vue'
    export default {
        props: ['show'],
        components: { Modal },
        methods: {
            close: function() {
                this.$emit('close')
            }
        }
    }
</script>