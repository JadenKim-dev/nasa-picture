class cannotGetPicturesFromNasaApi extends Error {
  constructor() {
    const message = "nasa api로부터 사진을 가져올 수 없습니다.";
    super(message);
  }
}

export {cannotGetPicturesFromNasaApi}