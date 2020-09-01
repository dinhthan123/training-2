<template>
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        <button type="button" class="close" @click.stop="close">&times;</button>
                         header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                         body
                    </slot>
                </div>

                <div class="modal-footer">
                    <button class="button-close" @click.stop="close">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['show'],
        
        mounted: function () {
            document.addEventListener("keydown", (e) => {
                if (this.show && e.keyCode == 27) {
                    this.close()
                }
            })
        },
        methods: {
            close: function() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 60%;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
        overflow-x: auto;
    }
    .modal-container {
        width: 75%;
        height: 80%;
        margin: 42px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
    }
    .modal-body {
        margin: 20px 0;
    }
    
    .modal-enter {
      opacity: 0;
    }
    .modal-leave-active {
      opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
</style>