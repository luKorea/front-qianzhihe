
export default {
    components: {
    },
    data() {
        return {
        };
    },
    computed: {

        routes() {
            return this.$store.state.user.roles
        },
    },
    methods: {
        /**
         * 是否有权限
         * @param {*} key 
         * @returns 
         */
        hasPermission(key) {
            let arr = this.routes.controls&&this.routes.controls.filter((v) => { return v.url == key });
            if (arr && arr.length > 0) {
                return 1
            } else {
                return 0
            }
        },
        /**
         * avue 按钮控制
         */
        configPermission() {
            let falg = 0;
            if (this.config.detail) {
                this.permission.viewBtn = this.routes.controls.filter((v) => { return v.url == this.config.detail }).join(',') ? true : false;
                this.permission.viewBtn ? falg++ : '';
            }
            if (this.config.save) {
                this.permission.addBtn = this.routes.controls.filter((v) => { return v.url == this.config.save }).join(',') ? true : false;
                this.permission.addBtn ? falg++ : '';
            }
            if (this.config.delete) {
                this.permission.delBtn = this.routes.controls.filter((v) => { return v.url == this.config.delete }).join(',') ? true : false;
                this.permission.delBtn ? falg++ : '';
            }
            if (this.config.update) {
                this.permission.editBtn = this.routes.controls.filter((v) => { return v.url == this.config.update }).join(',') ? true : false;
                this.permission.editBtn ? falg++ : '';
            }
            // if (!falg) {
            //     this.permission.menu = false
            //     console.log(this.permission.menu,'this.permission.menu');
            // }
            if (this.config.list) {
                let show = this.routes.controls.filter((v) => { return v.url == this.config.list }).join(',') ? true : false;
                this.option.searchShow = show;
                this.option.searchShowBtn = show;
                this.option.refreshBtn = show;
            }
        },
        runPermission() {
            this.configPermission();
        },
    },
    created() {
        this.runPermission();
    },
    mounted() {
    },
}
