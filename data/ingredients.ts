import { Language, FridgeCategory } from '../types';

type CategorizedIngredients = {
    [key in Language]?: {
        [key in FridgeCategory]?: string[];
    };
};

export const categorizedIngredients: CategorizedIngredients = {
    en: {
        meat: ["Chicken Breast", "Ground Beef", "Steak", "Pork Chop", "Bacon", "Sausage", "Lamb", "Fish Fillets", "Shrimp"],
        vegetables: ["Onion", "Garlic", "Carrot", "Celery", "Bell Pepper", "Tomato", "Potato", "Broccoli", "Spinach", "Kale", "Lettuce", "Cucumber", "Zucchini", "Mushroom", "Ginger", "Scallion", "Cilantro", "Parsley", "Basil"],
        fruits: ["Lemon", "Lime", "Apple", "Banana", "Avocado", "Berries", "Orange", "Grapes"],
        dairy: ["Milk", "Heavy Cream", "Butter", "Cheese", "Cheddar Cheese", "Parmesan Cheese", "Mozzarella Cheese", "Yogurt", "Sour Cream", "Eggs"],
        pantry: ["Rice", "Pasta", "Bread", "Flour", "Sugar", "Salt", "Black Pepper", "Olive Oil", "Soy Sauce", "Vinegar", "Mustard", "Ketchup", "Mayonnaise", "Nuts", "Peanut Butter"],
        other: ["Tofu"],
        frozenGoods: ["Frozen Pizza", "Frozen Vegetables", "Frozen Fries"],
        iceCream: ["Vanilla Ice Cream", "Chocolate Ice Cream", "Sorbet", "Frozen Yogurt"]
    },
    'zh-HK': {
        meat: ["雞胸肉", "免治牛肉", "牛扒", "豬扒", "煙肉", "香腸", "羊肉", "魚柳", "蝦"],
        vegetables: ["洋蔥", "蒜頭", "紅蘿蔔", "西芹", "燈籠椒", "番茄", "薯仔", "西蘭花", "菠菜", "羽衣甘藍", "生菜", "青瓜", "翠玉瓜", "蘑菇", "薑", "蔥", "芫茜", "番茜", "羅勒"],
        fruits: ["檸檬", "青檸", "蘋果", "香蕉", "牛油果", "莓果", "橙", "葡萄"],
        dairy: ["牛奶", "忌廉", "牛油", "芝士", "車打芝士", "巴馬臣芝士", "水牛芝士", "乳酪", "酸忌廉", "雞蛋"],
        pantry: ["米飯", "意粉", "麵包", "麵粉", "糖", "鹽", "黑胡椒", "橄欖油", "豉油", "醋", "芥末", "茄汁", "蛋黃醬", "堅果", "花生醬"],
        other: ["豆腐"],
        frozenGoods: ["急凍薄餅", "急凍蔬菜", "急凍薯條"],
        iceCream: ["雲呢拿雪糕", "朱古力雪糕", "雪葩", "乳酪雪糕"]
    },
    'zh-CN': {
        meat: ["鸡胸肉", "牛肉末", "牛排", "猪排", "培根", "香肠", "羊肉", "鱼片", "虾"],
        vegetables: ["洋葱", "大蒜", "胡萝卜", "芹菜", "甜椒", "番茄", "土豆", "西兰花", "菠菜", "羽衣甘蓝", "生菜", "黄瓜", "西葫芦", "蘑菇", "姜", "葱", "香菜", "欧芹", "罗勒"],
        fruits: ["柠檬", "青柠", "苹果", "香蕉", "牛油果", "浆果", "橙子", "葡萄"],
        dairy: ["牛奶", "奶油", "黄油", "奶酪", "切达奶酪", "帕玛森奶酪", "马苏里拉奶酪", "酸奶", "酸奶油", "鸡蛋"],
        pantry: ["米饭", "意大利面", "面包", "面粉", "糖", "盐", "黑胡椒", "橄榄油", "酱油", "醋", "芥末", "番茄酱", "蛋黄酱", "坚果", "花生酱"],
        other: ["豆腐"],
        frozenGoods: ["冷冻披萨", "冷冻蔬菜", "冷冻薯条"],
        iceCream: ["香草冰淇淋", "巧克力冰淇淋", "雪葩", "酸奶冰淇淋"]
    },
    ja: {
        meat: ["鶏胸肉", "牛ひき肉", "ステーキ", "ポークチョップ", "ベーコン", "ソーセージ", "ラム肉", "魚の切り身", "エビ"],
        vegetables: ["玉ねぎ", "にんにく", "人参", "セロリ", "ピーマン", "トマト", "じゃがいも", "ブロッコリー", "ほうれん草", "ケール", "レタス", "きゅうり", "ズッキーニ", "マッシュルーム", "生姜", "ネギ", "コリアンダー", "パセリ", "バジル"],
        fruits: ["レモン", "ライム", "りんご", "バナナ", "アボカド", "ベリー類", "オレンジ", "ぶどう"],
        dairy: ["牛乳", "生クリーム", "バター", "チーズ", "チェダーチーズ", "パルメザンチーズ", "モッツァレラチーズ", "ヨーグルト", "サワークリーム", "卵"],
        pantry: ["ご飯", "パスタ", "パン", "小麦粉", "砂糖", "塩", "黒胡椒", "オリーブオイル", "醤油", "酢", "マスタード", "ケチャップ", "マヨネーズ", "ナッツ", "ピーナッツバター"],
        other: ["豆腐"],
        frozenGoods: ["冷凍ピザ", "冷凍野菜", "フライドポテト"],
        iceCream: ["バニラアイスクリーム", "チョコレートアイスクリーム", "シャーベット", "フローズンヨーグルト"]
    },
    ko: {
        meat: ["닭 가슴살", "다진 쇠고기", "스테이크", "돼지고기 목살", "베이컨", "소시지", "양고기", "생선 필레", "새우"],
        vegetables: ["양파", "마늘", "당근", "셀러리", "피망", "토마토", "감자", "브로콜리", "시금치", "케일", "상추", "오이", "주키니", "버섯", "생강", "파", "고수", "파슬리", "바질"],
        fruits: ["레몬", "라임", "사과", "바나나", "아보카도", "베리류", "오렌지", "포도"],
        dairy: ["우유", "생크림", "버터", "치즈", "체다 치즈", "파마산 치즈", "모짜렐라 치즈", "요거트", "사워 크림", "계란"],
        pantry: ["밥", "파스타", "빵", "밀가루", "설탕", "소금", "후추", "올리브 오일", "간장", "식초", "겨자", "케첩", "마요네즈", "견과류", "땅콩 버터"],
        other: ["두부"],
        frozenGoods: ["냉동 피자", "냉동 야채", "감자 튀김"],
        iceCream: ["바닐라 아이스크림", "초콜릿 아이스크림", "셔벗", "프로즌 요거트"]
    },
};
