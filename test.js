let jobKnowledgeVoList = [
    {
        "_id": "2",
        "knowledge_classification": "文科",
        "knowledge_name": "英语",
        "knowledge_names": [
            "英语"
        ],
        "occupationName": "审计师"
    },
    {
        "_id": "3",
        "knowledge_classification": "理科",
        "knowledge_name": "代数#几何#统计#微积分",
        "knowledge_names": [
            "代数",
            "几何",
            "统计",
            "微积分"
        ],
        "occupationName": "审计师"
    },
    {
        "_id": "4",
        "knowledge_classification": "政治",
        "knowledge_name": "法律#政治",
        "knowledge_names": [
            "法律",
            "政治"
        ],
        "occupationName": "审计师"
    },
    {
        "_id": "1",
        "knowledge_classification": "商科",
        "knowledge_name": "会计学#管理学#经济学#税法",
        "knowledge_names": [
            "会计学",
            "管理学",
            "经济学",
            "税法"
        ],
        "occupationName": "审计师"
    }
];


let arr = [];
jobKnowledgeVoList.forEach(item => {
    arr.push({
        label: item.knowledge_classification,
        prop: {
            [item.knowledge_classification]: item.knowledge_names
        }
    })
})
console.log(arr);