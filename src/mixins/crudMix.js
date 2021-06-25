import { req } from '@/utils/req.js'
import crudOptionMix from "@/mixins/crudOptionMix";


export default {
    mixins: [
        /**
         * 参数处理
         */
        crudOptionMix
    ],
    data() {
        var checkfun = (rule, value, callback) => {
            callback();
        };
        return {
            dayjs: dayjs,//声明dayjs  eg：dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS A')
            page: {
                pageSize: 10,
                pagerCount: 5,
                currentPage: 1,//当前选中页码
            },
            data: [],
            option: {
                // index: true,
                align: 'center',
                headerAlign: 'center',
                border: true,
                stripe: true,//斑马纹
                refreshBtn: true,
                columnBtn: false,
                excelBtn: false,
                addBtn: false,//添加按钮是否开启
                editBtn: true,
                viewBtn: true,
                indexLabel: '序号',
                searchMenuSpan: 6,
                menuBtnTitle: '操作',
                viewTitle: '查看',
                editTitle: '编辑',
                emptyBtnText: '重置',
                dialogWidth: '92%',
                menuWidth: 140,
                searchMenuPosition: 'left',
                emptyBtnIcon:'el-icon-close',
                column: [
                    {
                        label: '编号',//列名称
                        prop: 'id',//列字段
                        hide: true,//隐藏列

                        disabled: true,//全部是否禁止
                        addDisabled: true,//表单新增时是否禁止
                        editDisabled: true,//表单编辑时是否禁止

                        display: false,//全部是否可见
                        viewDisplay: false,//表单查看是否可见
                        addDisplay: false,//表单新增时是否可见
                        editDisplay: false,//表单编辑是否可见

                        slot: true,//列自定义
                        formslot: true,//表单自定义   
                        typeslot: true,//表单组件自定义	

                        sortable: true,//是否加入动态现隐列

                        precision: 2,//数字框输入精度（当type为number时）0.00
                        minRows: 1,//设置计数器允许的最小值
                        maxRows: 10,//设置计数器允许的最大值
                        filters: true,//筛选
                        showColumn: false,//控制列显隐控制

                        rules://表单规则,参考ele表单规则配置
                            [
                                // required 监测是否为空
                                // min 最小
                                // max 最大
                                // step 步幅 确定一个法定值。 -3 0 3 6 9
                                // list 必须结合datalist标签，绑定datalist id名称
                                // autocomplete 是否自动提示信息 属性值 on off
                                // placeholder 文本框的提示信息
                                // autofocus 自动聚焦。一个页面只能由一个
                                // pattern 后面的属性值是一个正则表达式
                                // novalidate 取消验证
                                // multiple 选择（上传）多个

                                /*required 是否必填  trigeer 触发检查的方式 blur 失去焦点时检查 change 值发生改变时触发*/
                                { required: true, message: '请输入活动名称', trigger: 'blur' },
                                /*min  最小值   max 最大值 注意: type默认为string min和max则为最小长度和最大长度  当需要设置成数字的最小值和最大值时 type:'number' 需要在绑定时写  v-model.number='age' 但input的type 不能设置为number否则获取的值会一直被视为是字符串 */
                                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                                /*type的用法 ,其它的使用请参考文档*/
                                { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
                                /*使用正则*/
                                { pattern: /^[a-z]+$/, message: '只能输入字母!' },
                                /*自定义检查方法.checkfun ,参数 rule, value, callback ,检测成功 或不成功都需要手动调用 callback , 验证不成功时 callback(new Error('提示信息')) :注意 当在下面的对象中有message时则验证失败只会显示message的值 */
                                { validator: checkfun, trigger: 'blur' }
                            ]
                    },
                ]
            },
            form: {},
            params: {},
            loading: false,
            config: {},
            method: {//修改请求method post GET
                detail: '',
                save: '',
                delete: '',
                update: '',
                list: ''
            },
            search: {},
            permission: {},
        };
    },
    computed: {
        /**
         * 绑定属性 avue
         * @returns 
         */
        bindVal() {
            return {
                ref: 'crud',
                data: this.data,
                option: this.option,
                tableLoading: this.loading,
                permission: this.permission,
                beforeOpen: this.beforeOpen,
                'row-class-name': this.tableRowClassName,
            }
        },
        /**
         * 绑定事件 avue
         * @returns 
         */
        onEvent() {
            return {
                'on-load': this.getList,
                'row-save': this.rowSave,
                'row-update': this.rowUpdate,
                'row-del': this.rowDel,
                'refresh-change': this.refreshChange,
                'search-reset': this.searchChangeReset,
                'search-change': this.searchChange,
                'expand-change': this.toggleRowExpansion,
            }
        },
        /**
         * 列表key
         * @returns 
         */
        rowKey() {
            return this.config.rowKey || 'id'
        }
    },

    methods: {
        /**
         * 关闭对话框
         * @param {*} name 
         * @param {*} flag =true 关闭
         */
        closeDialog(name, flag) {
            if (this.$refs[name]) {
                this.$refs[name].getList()
            }
            if (flag) {
                this.$refs.crud.closeDialog()
            }
            this.getList()
        },
        /**
         * 自定义查看对话框
         * @param {*} row 
         * @param {*} index 
         */
        rowView(row, index) {//自定义查看(group_def group_column_formslot 生效 )
            if (this.option && this.option.group && this.option.group.length > 0) {
                this.option.group[0].column.forEach((v) => {
                    v.prop == row.formslot ? v.viewDisplay = true : v.viewDisplay = false
                })
            }
            this.option.viewTitle = row.viewTitle;
            this.option = Object.assign(this.option, {})
            this.$refs.crud.rowView(row, index)
        },
        /**
         * 返回行类名
         * @param {*} param0 
         * @returns 
         */
        tableRowClassName({ row, rowIndex }) {
            return '';
        },
        /**
         * 展开
         * @param {*} row 
         * @param {*} expanded 
         */
        toggleRowExpansion(row, expanded) {
            console.log('toggleRowExpansion');
            console.log(row, expanded);
        },
        /**
         * 打开对话框
         * @param {*} done 
         * @param {*} type 
         */
        async beforeOpen(done, type) {
            console.log('beforeOpen', type);
            let that = this;
            const callback = async () => {
                if (that.config['detail']) {
                    let params = {}
                    params[that.rowKey] = that.form[that.rowKey];
                    let res = await req(that.config['detail'], params, that.method['detail'] || "post")
                    if (that.openAfter) {
                        that.openAfter(res, that.form, that.form.$index, type)
                    } else {
                        that.form = Object.assign(that.form, res.data)
                    }
                }
            }
            if (that.openBefore) {
                that.openBefore(type)
            }
            if (type == "edit" || type == "view") {
                await callback()
            }
            done()
        },
        /**
         * 获取列表
         */
        getList() {
            let that = this;
            const callback = () => {
                that.loading = true
                let pageParams = {}
                pageParams['pageNum'] = that.page.currentPage
                pageParams['pageSize'] = that.page.pageSize
                const params = Object.assign(pageParams, that.params)
                req(that.config['list'], params, that.method['list'] || "post").then(function (res) {
                    setTimeout(() => {
                        that.loading = false
                    }, 150);
                    const data = res.data
                    that.data = Object.assign(res.data.list || [], []);
                    that.page.total = res.data.total;
                    if (that.listAfter) {
                        that.listAfter(data)
                    } else {
                    }
                }).catch(function (error) {
                    that.loading = false
                });
            }
            if (that.listBefore) {
                that.listBefore()
            }
            callback()
        },
        /**
         * 新增保存
         * @param {*} row 
         * @param {*} done 
         * @param {*} loading 
         * @returns 
         */
        rowSave(row, done, loading) {
            let that = this;
            const callback = () => {
                delete that.form.params
                req(that.config['save'], that.form, that.method['save'] || "post")
                    .then((res) => {
                        that.getList()
                        if (that.addAfter) {
                            that.addAfter(res)
                        } else {
                            that.$message.success('新增成功')
                        }
                        done()
                    }).catch(() => {
                        loading()
                    })
            }
            if (that.validateFn) {
                if (that.validateFn('add')) {
                    loading()
                    return
                }
            }
            if (that.addBefore) {
                if (that.addBefore()) {
                    callback()
                } else {
                    loading()
                }

            } else {
                callback()
            }
        },
        /**
         * 更新保存
         * @param {*} row 
         * @param {*} index 
         * @param {*} done 
         * @param {*} loading 
         * @returns 
         */
        rowUpdate(row, index, done, loading) {
            let that = this;
            const callback = () => {
                delete that.form.params
                req(that.config['update'], that.form, that.method['update'] || "post")
                    .then((data) => {
                        that.getList()
                        if (that.updateAfter) {
                            that.updateAfter(data)
                        } else {
                            that.$message.success('更新成功')
                        }
                        done()
                    }).catch(() => {
                        loading()
                    })
            }
            if (that.validateFn) {
                if (that.validateFn('edit')) {
                    loading()
                    return
                }
            }
            if (that.updateBefore) {
                if (that.updateBefore()) {
                    callback()
                } else {
                    loading()
                }
            } else {
                callback()
            }
        },
        /**
         * 删除
         * @param {*} row 
         * @param {*} index 
         */
        rowDel(row, index) {
            let that = this;
            const callback = () => {
                req(that.config['delete'], row, that.method['delete'] || "post")
                    .then((data) => {
                        that.getList()
                        if (that.delAfter) {
                            that.delAfter(data, row, index)
                        } else {
                            that.$message.success('删除成功')
                        }
                    })
            }
            let PageIndex = ((that.page.currentPage - 1) * that.page.pageSize) + index + 1
            that.$confirm(`此操作将永久删除序号【${PageIndex}】的数据, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (that.delBefore) {
                    row = that.delBefore(row)
                    callback()
                } else {
                    callback()
                }
            }).catch(() => {
            });
        },
        /**
         * 清空|重置
         * @param {*} params 
         * @param {*} done 
         */
        searchChangeReset(params, done) {
            if (this.resetBefore) {
                this.resetBefore()
            }
            console.log(params);
            if (done) done()
            this.params = params
            this.page.currentPage = 1
            this.getList()
        },
        /**
         * 查询
         * @param {*} params 
         * @param {*} done 
         */
        searchChange(params, done) {
            if (done) done()
            this.params = params
            this.page.currentPage = 1
            this.getList()
        },
        /**
         * 刷新
         */
        refreshChange() {
            this.getList()
        },
    },
    created() {
    },
    mounted() {
        //console.log(this.$refs.crud);
    },
}
