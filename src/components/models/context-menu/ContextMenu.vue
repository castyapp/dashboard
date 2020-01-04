<template>
    <div class="context-menu"
         ref="popper"
         v-show="isVisible"
         tabindex="-1"
         v-click-outside="close"
         @contextmenu.capture.prevent>
        <ul>
            <slot :contextData="contextData" :type="type" />
        </ul>
    </div>
</template>

<script>

    import Popper from 'popper.js';
    import ClickOutside from 'vue-click-outside'

    // @vue/component
    export default {
        props: {
            boundariesElement: {
                type: String,
                default: 'body',
            },
        },
        components: {
            Popper,
        },
        data() {
            return {
                opened:      false,
                contextData: {},
                type:        "",
            };
        },
        directives:{
            ClickOutside,
        },
        computed: {
            isVisible() {
                return this.opened;
            },
        },
        methods: {
            open(evt, type, data) {

                this.opened = true;
                this.contextData = data;
                this.type = type;

                if (this.popper) {
                    this.popper.destroy();
                }

                this.popper = new Popper(this.referenceObject(evt), this.$refs.popper, {
                    placement: 'right-start',
                    modifiers: {
                        preventOverflow: {
                            boundariesElement: document.querySelector(this.boundariesElement),
                        },
                    },
                });

                // Recalculate position
                this.$nextTick(() => {
                    this.popper.scheduleUpdate();
                });

            },
            close() {
                this.opened = false;
                this.contextData = null;
            },
            referenceObject(evt) {
                const left = evt.clientX;
                const top = evt.clientY;
                const right = left + 1;
                const bottom = top + 1;
                const clientWidth = 1;
                const clientHeight = 1;

                function getBoundingClientRect() {
                    return {
                        left,
                        top,
                        right,
                        bottom,
                    };
                }

                return {
                    getBoundingClientRect,
                    clientWidth,
                    clientHeight,
                };
            },
        },
        beforeDestroy() {
            if (this.popper !== undefined) {
                this.popper.destroy();
            }
        },
    };

</script>

<style scoped>

    .context-menu {
        position: fixed;
        z-index: 999;
        overflow: hidden;
        background: #131212;
        border-radius: 4px;
        width: 190px;
        padding: 10px;
    }
    .context-menu:focus {
        outline: none;
    }
    .context-menu ul {
        padding: 0;
        margin: 0;
    }

</style>
