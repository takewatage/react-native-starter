export type Mypage = {
    title: string,
    items: MypageItem[]
}

export type MypageItem = {
    title: string,
    icon: string,
    iconType: string
}

export default [
    {
        title: 'アカウント',
        items: [
            {
                title: '公開する情報を管理',
                icon: 'file-text',
                iconType: 'feather'
            },
            {
                title: '提出した書類の管理',
                icon: 'checkbox-multiple-blank-outline',
                iconType: 'material-community'
            },
            {
                title: '緊急連絡先の設定',
                icon: 'user',
                iconType: 'feather'
            },
        ],
    },
    {
        title: '仕事',
        items: [
            {
                title: '過去の案件と報酬ポイント',
                icon: 'file-text',
                iconType: 'feather'
            },
        ]
    },

    {
        title: 'その他',
        items: [
            {
                title: 'お問い合わせ',
                icon: 'mail',
                iconType: 'feather'
            },
            {
                title: 'よくある質問',
                icon: 'checkbox-multiple-blank-outline',
                iconType: 'material-community'
            },
            {
                title: 'プライバシーポリシー',
                icon: 'user',
                iconType: 'feather'
            },
            {
                title: '利用規約',
                icon: 'user',
                iconType: 'feather'
            },
        ]
    },

    {
        title: 'その他２',
        items: [
            {
                title: 'ログアウト',
                icon: 'mail',
                iconType: 'feather'
            },
            {
                title: '退会手続き',
                icon: 'checkbox-multiple-blank-outline',
                iconType: 'material-community'
            }
        ]
    }
];