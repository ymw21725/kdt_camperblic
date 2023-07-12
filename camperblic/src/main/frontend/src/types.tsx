
//호준이꺼
export interface Member {
    userid: string;
    name: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    createdDate: string;
}

//종쪼꺼
export interface Order{
    orderid : string,
    addressee : string,
    userid: string,
    address1: string,
    address2: string,
    address3: string,
    orderstatus: string,
    deliverycost : number,
    orderdate : string,
}

//신준이꺼
export interface Item {
    itemId: string,
    name: string,
    price: number,
    description: string,
    categoryId: string,
    imagePath: string,
    amount: number,
    currentStock: number,
    detailPath: string;

}


//민수꺼
export interface Posting {
    id: number,
    title: string,
    name: string,
    createdate: string, // LocalDateTime은 string으로 처리
    views: number | null,
    content: string,
    category: string,
}

export interface CommentOne {
    id: number,
    root: number,
    name: string,
    createdate: string,
    content: string,
    mention: number,
    tagname: string,
    reply_count: number,
    like_count: number,
    dislike_count: number,
}

// 민우
export interface Total{
    tentTotal:number,
    chairTotal:number,
    matTotal:number,
    cookTotal:number,
    etcTotal:number,
    totalSum:number;
}

export interface Tmp{
    orderid:string,
    addressee:string,
    userid:string,
    address1:string,
    address2:string,
    address3:string,
    orderstatus:string,
    deliverycost:number,
    orderdate:string,
}

export interface GraphDTO{
    fourTotalPrice:number,
    threeTotalPrice:number,
    twoTotalPrice:number,
    oneTotalPrice:number,
    currTotalPrice:number,
    totalPriceSum:number,
}