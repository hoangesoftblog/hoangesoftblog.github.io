export interface AllRoomsStatus {
    code: number;
    msg: string;
    data: {
        hot: Room[];
        // some HTML elements
        scroll: string;
    };
}

// TODO: Only know about success format, not failue one
export interface RoomDetailsStatus {
    code: number;
    msg: string;
    data: RoomStream;
}

export interface RoomStream {
    room: Room;
    stream: Stream;
    // It's a string like this: "7, 3, 2, 5" 
    // -> not sure what it means
    streamTypes: string;
};


export interface Room {
    anchor: Anchor;
    roomNum: string;
    title: string;                  // Match title
    
    notice: string;                 // Notice from commentator
    detail: string;                 // Mostly just the commentator's name
    cover: string;                  // Cover imageURL for the match
    customCoverUrl: string;
    cutOutCustomCoverUrl: string;   // Smaller size of customCoverUrl
    customCover: string;            // Only the segments part of the customCoverUrl
    
    // Metadata from the source, or unknown meaning
    viewCount: number;
    markType: number;
    hd: number;
    liveStatus: number;
    liveType: number;
    liveTypeParent: number;
    focusCount: number;
    contact: string;
    coverType: number;
    streamType: number;
};


export interface Anchor {
    uid: number;
    nickName: string;
    icon: string;
    gender: number;
    birthday: number;
    userType: number;
    grow: number;
    score: number;
    growDto: GrowDto;
    createTime: number;
    cutOutIcon: string;
}

export interface GrowDto {
    id: number;
    name: string;
    minGrom: number;
    nextMinGrom: number;
}

export interface Stream {
    flv: string;
    hdFlv: string;
    m3u8: string;
    hdM3u8: string;
}