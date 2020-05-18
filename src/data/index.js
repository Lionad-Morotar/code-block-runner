import Vue from 'vue'
import debounce from 'debounce'

export default new Vue({
    data () {
        return {
            code: {
                html: {
                    name: 'html',
                    code: ''
                },
                js: {
                    name: 'js',
                    code: ''
                },
                css: {
                    name: 'css',
                    code: ''
                },
            },
            visiblePans: ['html', 'css', 'js', 'output'],
            activePan: '',
            autoRun: true,
        }
    },
    watch: {
        visiblePans () {
            this.$emit('visiblePans-change', this.visiblePans)
        },
        code: {
            deep: true,
            handler () {
                if (this.autoRun) {
                    this.debounceRunCode()
                }
            }
        }
    },
    created() {
        this.$on('togglePan', panName => {
            const idx = this.visiblePans.indexOf(panName)
            if (idx !== -1) {
                this.visiblePans.splice(idx, 1)
            } else {
                this.visiblePans.push(panName)
            }
            this.visiblePans = this.sortPans()
        })
    },
    methods: {
        sortPans() {
            const pans = ['html', 'css', 'js', 'console', 'output']
            return this.visiblePans.sort((a, b) => {
                return pans.indexOf(a) > pans.indexOf(b)
            })
        },
        debounceRunCode: debounce(function() {
            this.$emit('run')
        }, 500)
    }
})