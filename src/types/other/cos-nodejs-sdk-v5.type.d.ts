/** 腾讯云储存连接信息 */
interface COS_Info {
  /** 密编 */
  SecretId: string;
  /** 密钥 */
  SecretKey: string;
  /** 同一个实例下上传的文件并发数，默认值3 */
  FileParallelLimit?: number;
  /** 同一个上传文件的分块并发数，默认值3 */
  ChunkParallelLimit?: number;
  /** 分块上传及分块复制时，出错重试次数，默认值3（加第一次，请求共4次） */
  ChunkRetryTimes?: number;
  /** 分块上传时，每块的字节数大小，默认值1048576（1MB） */
  ChunkSize?: number;
  /** 使用 uploadFiles 批量上传时，文件大小大于该数值将使用按分片上传，否则将调用简单上传，单位 Byte，默认值1048576（1MB） */
  SliceSize?: number;
  /** 进行分块复制操作中复制分块上传的并发数，默认值20 */
  CopyChunkParallelLimit?: number;
  /** 使用 sliceCopyFile 分块复制文件时，每片的大小字节数，默认值10485760（10MB） */
  CopyChunkSize?: number;
  /** 使用 sliceCopyFile 分片复制文件时，文件大小大于该数值将使用分片复制 ，否则将调用简单复制，默认值10485760（10MB） */
  CopySliceSize?: number;
  /** 上传进度的回调方法 onProgress 的回调频率，单位 ms ，默认值1000 */
  ProgressInterval?: number;
  /** 发请求时用的协议，可选项https:、http:，默认判断当前页面是http:时使用http:，否则使用https: */
  Protocol?: string;
  /** 调用 getService 方法时，请求的域名，例如service.cos.myqcloud.com */
  ServiceDomain?: string;
  /** 调用操作存储桶和对象的 API 时自定义请求域名。可以使用模版， 例如"{Bucket}.cos.{Region}.myqcloud.com"，即在调用 API 时会使用参数中传入的 Bucket 和 Region 进行替换 */
  Domain?: string;
  /** 上传队列最长大小，超出队列大小并失败/已完成/已取消状态的任务会被清理，默认1000 */
  UploadQueueSize?: number;
  /** 强制使用后缀式模式发请求。后缀式模式中 Bucket 会放在域名后的 pathname 里，并且 Bucket 会加入签名 pathname 计算，默认 false */
  ForcePathStyle?: boolean;
  /** 强制上传文件也校验 Content-MD5，会对文件请求 Body 计算 md5 放在 header 的 Content-MD5 字段里，默认 false */
  UploadCheckContentMd5?: boolean;
  /** 超时时间，单位毫秒，默认为0，即不设置超时时间 */
  Timeout?: number;
  /** 多个请求同用 TCP 连接，默认 true，若请求并发量大建议 打开 */
  KeepAlive?: boolean;
  /** 严格校验 HTTPS 证书，默认 true */
  StrictSsl?: boolean;
  /** 请求时使用 HTTP 代理，例如：http://127.0.0.1:8080 */
  Proxy?: string;
  /** 获取签名的回调方法，如果没有 SecretId、SecretKey 时，这个参数必选 */
  getAuthorization?: Function;
}

/** 结果信息 */
interface BackcallResult {
  /** 请求返回的 HTTP 状态码，例如200、403、404等，如果删除成功或者文件不存在则返回204或200，如果找不到指定的 Bucket，则返回404 */
  statusCode: number;
  /** 请求返回的头部信息 */
  headers: { [name: string]: string; };
}

/** 回调函数 */
type Backcall<DATA = BackcallResult> = (err: BackcallResult | undefined, data: DATA) => void;

/** 存储桶信息 */
interface BucketInfo {
  /** 存储桶 */ Bucket: string;
  /** 地区 */ Region: string;
  /** 前缀 */ Prefix?: string;
}

/** 存储桶拥有者 */
interface BucketOwner {
  /** 对象持有者的完整 ID，格式为qcs::cam::uin/[OwnerUin]:uin/[OwnerUin]，例如 qcs::cam::uin/100000000001:uin/100000000001，其中100000000001为 uin */
  ID: string;
  /** 对象持有者的名称 */
  DisplayName: string;
}

/** 存储桶内容 */
interface BucketContent {
  /** 对象键，即对象的名称 */
  Key: string;
  /** 对象最后修改时间，为 ISO8601 格式，例如2019-05-24T10:56:40Z */
  LastModified: string;
  /** 根据对象内容计算出的 MD5 算法校验值，例如"22ca88419e2ed4721c23807c678adbe4c08a7880"，注意前后携带双引号 */
  ETag: string;
  /** 对象大小，单位 Byte */
  Size: string;
  /** 对象持有者信息 */
  Owner: BucketOwner;
  /** 对象的存储类型，枚举值为：STANDARD、STANDARD_IA、ARCHIVE等，更多存储类型请参见 存储类型概述 文档 */
  StorageClass: string;
}

/** 存储桶结果 */
interface BucketResult extends BackcallResult {
  /** 存储桶的名称，格式为 <BucketName-APPID>，例如 examplebucket-1250000000 */
  Name: `${string}-${number}`;
  /** 对象键前缀匹配，从该标记之后（不含）按照 UTF-8 字典序返回对象键条目 */
  Prefix: string;
  /** 默认以 UTF-8 二进制顺序列出条目，所有列出条目从 Marker 开始 */
  Marker: string;
  /** 单次响应请求内返回结果的最大的条目数量 */
  MaxKeys: string;
  /** 定界符 */
  Delimiter: string;
  /** 响应请求条目是否被截断，值为 'true' 或者 'false' */
  IsTruncated: "false" | "true";
  /** 内容列表 */
  Contents: BucketContent[];
}


/** 存储桶删除信息 */
interface BucketRemove {
  /** 存储桶 */ Bucket: string;
  /** 地区 */ Region: string;
  /** 布尔值，这个值决定了是否启动 Quiet 模式，值为 true 启动 Quiet 模式，值为 false 则启动 Verbose 模式，默认值为 false */
  Quiet?: boolean;
  /** 删除键表 */
  Objects: {
    /** 对象键，即对象的名称 */
    Key: string;
  }[];
}

/** 进度信息 */
interface ProgressInfo {
  // 已经校验的文件部分大小，以字节（Bytes）为单位
  loaded: number;
  // 整个文件的大小，以字节（Bytes）为单位
  total: number;
  // 文件的校验速度，以字节 / 秒（Bytes / s）为单位
  speed: number;
  // 文件的校验百分比，以小数形式呈现，例如：校验50 % 即为0.5
  percent: number;
}

/** 分块上传信息 */
interface SliceUploadInfo {
  /** 存储桶的名称，命名格式为 BucketName - APPID，此处填写的存储桶名称必须为此格式 */
  Bucket: string;
  /** 存储桶所在地域，枚举值请参见 地域和访问域名 */
  Region: string;
  /** 对象键（Object 的名称），对象在存储桶中的唯一标识，详情请参见 对象概述 */
  Key: string;
  /** 上传文件路径 */
  FilePath: string;
  /** 分块大小 */
  SliceSize?: string;
  /** 分块的并发量 */
  AsyncLimit?: string;
  /** 对象的存储类型，枚举值：STANDARD、STANDARD_IA、ARCHIVE 等，更多存储类型请参见 存储类型概述 文档 */
  StorageClass?: string;
  /** 上传任务创建时的回调函数，返回一个 taskId，唯一标识上传任务，可用于上传任务的取消（cancelTask），停止（pauseTask）和重新开始（restartTask） */
  onTaskReady?: (taskId: string) => void;
  /** 计算文件 MD5 值的进度回调函数，回调参数为进度对象 progressData */
  onHashProgress?: (progressData: ProgressInfo) => void;
  /** 上传文件的进度回调函数，回调参数为进度对象 progressData */
  onProgress?: (progressData: ProgressInfo) => void;
}

/** 分块上传结果 */
interface SliceUploadResult extends BackcallResult {
  /** 创建对象的外网访问域名 */
  Location: string;
  /** 分块上传的目标存储桶 */
  Bucket: string;
  /** 对象键（Object 的名称），对象在存储桶中的唯一标识，详情请参见 对象概述 */
  Key: string;
  /** 合并后文件的唯一 ID，格式："uuid-<分块数>" 例如"22ca88419e2ed4721c23807c678adbe4c08a7880-3"，注意前后携带双引号 */
  ETag: string;
  /** 在开启过版本控制的存储桶中上传对象返回对象的版本 ID，存储桶从未开启则不返回该参数 */
  VersionId: string;
}

/** 腾讯云储存 */
declare class COS {

  /**
   * 创建腾讯云储存
   * @param info 腾讯云储存连接信息
   */
  constructor(info: COS_Info);

  /**
   * 取存储桶
   * @param bucket 储存桶信息
   * @param backcall 回调函数
   */
  getBucket(bucket: BucketInfo, backcall: Backcall<BucketResult>): void;

  /**
   * 删除多个对象
   * @param bucket 储存桶信息
   * @param backcall 回调函数
   */
  deleteMultipleObject(bucket: BucketRemove, backcall: Backcall): void;

  /**
   * 分块上传对象
   *
   * 可用于实现文件的分块上传，适用于大文件上传。
   * @param bucket 储存桶信息
   * @param backcall 回调函数
   */
  sliceUploadFile(bucket: SliceUploadInfo, backcall: Backcall<SliceUploadResult>): void;

}

declare module "cos-nodejs-sdk-v5" {
  export = COS;
}

