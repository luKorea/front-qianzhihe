import { filtersFormatMoney, formatterFiltersFormatMoney } from '@/utils/filters.js'
export default {
    filters: {
        /**
         * 格式化金钱
         * @param {*} num 
         * @returns 
         * this.$options.filters['filtersFormatMoney']
         */
        filtersFormatMoney: filtersFormatMoney,
    },
    methods: {
        /**
         * 必填
         * @param {*} title 
         * @returns 
         */
        required(title) {
            return [{
                required: true,
                message: `请输入${title}`,
                trigger: "blur"
            }]
        },
        /**
         * 参数处理 基础
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_def(label, prop, isRequired, other) {
            return [{
                label: label,
                prop: prop,
                rules: isRequired ? this.required(label) : [],
                ...other,
            }]
        },
        /**
         * 参数处理 金钱
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_money(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'number',
                    value: 0,
                    minRows: 0,
                    precision: 2,
                    formatter: formatterFiltersFormatMoney,
                    ...other,
                }
            )
        },
        /**
         * 参数处理 多行文本
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_textarea(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'textarea',
                    ...other,
                })
        },
        /**
         * 参数处理 开关
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_switch(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'switch',
                    ...other,
                })
        },
        /**
        * 参数处理checkbox
        * @param {*} label 
        * @param {*} prop 
        * @param {*} isRequired 
        * @param {*} other 
        * @returns 
        */
        column_checkbox(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'checkbox',
                    ...other,
                })
        },
        /**
         * 参数处理 日期时间
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_datetime(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'datetime',
                    format: 'yyyy-MM-DD HH:mm:ss',
                    width: 140,
                    ...other,
                })
        },
        /**
         * 参数处理 搜索自定义
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_searchslot(label, prop, isRequired, other) {
            return this.column_def(label, prop, false,
                {
                    hide: true,
                    search: true,
                    searchslot: true,
                    searchSpan: 6,
                    searchslot: true,
                    addDisplay: false,
                    viewDisplay: false,
                    editDisplay: false,
                    ...other,
                })
        },
        /**
         * 参数处理 下拉选择
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        column_select(label, prop, isRequired, other) {
            return this.column_def(label, prop, isRequired,
                {
                    type: 'select',
                    ...other,
                })
        },
        /**
         * 参数处理 时间限制
         * @param {*} label 
         * @param {*} prop 
         * @param {*} isRequired 
         * @param {*} other 
         * @returns 
         */
        pickerOptions() {
            return {
                pickerOptions: {
                    onPick: ({ maxDate, minDate }) => {
                        this.selectDate = minDate.getTime();
                        if (maxDate) {
                            this.selectDate = ''
                        }
                    }, disabledDate: (time) => {
                        if (this.selectDate !== '') {
                            const one = 30 * 24 * 3600 * 1000 * 3;
                            const minTime = this.selectDate - one;
                            const maxTime = this.selectDate + one;
                            return time.getTime() < minTime || time.getTime() > maxTime
                        }
                    }
                }
            }
        },
        /**
         * 分组参数处理 自定义表单插槽  查看 
         * @param {*} prop 
         * @param {*} other 
         * @returns 
         */
        group_column_formslot(prop, other) {
            return [{
                prop: prop,
                hide: true, editDisplay: false, viewDisplay: true, addDisplay: false, formslot: true, span: 24, labelWidth: 0,
                ...other,
            }]
        },
        /**
         * 分组参数处理 基础 调用查看对话框显示不同数据
         * @param {*} column 
         * @returns 
         */
        group_def(column) {
            return {
                group: [
                    {
                        prop: 'group',
                        arrow: false,
                        addDisplay: false,
                        viewDisplay: true,
                        editDisplay: false,
                        column: column
                    },
                ]
            }
        }
    },
}
