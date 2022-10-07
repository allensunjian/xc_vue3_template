interface IFunction<T = any> {
  (...items: Array<any>): T;
}

interface proxyHandler {
  set?: IFunction<boolean>;
  get?: IFunction<any>;
}

interface IThenable {
  then: IFunction<void>;
}

interface IRespones {
  msg: null | string;
  code: number;
  data: IObject | null;
}

interface IObject<T = any> {
  [x: string]: T;
}

type transferObject<T = any> = {
  [item: string]: T;
};
type activeObject = {
  key: string;
  default: any;
};
type optionsType = {
  activeObject?: activeObject;
  requestDely?: number;
};

type activeLibType = {
  inited: boolean;
  key: string;
  defaultValue: any;
  rejectInfo: string;
  setVal: IFunction<void>;
};
type readRetuns = {
  key: string;
  default: any;
};
type TransferType = {
  query: transferObject<any>;
  result: IObject<any>;
  handler?: proxyHandler;
  options?: optionsType;
};
type transferReturn = {
  mount: IFunction;
  getQuery: IFunction<IObject>;
  capture: IFunction<void>;
  getResult: IFunction<any>;
  reset: IFunction<any>;
};

const NOOP = () => {
  /* empty block */
};

const Empty = {};

const ValAcross = (val: any) => val;

const ReadSetActiveOpts = (opts: TransferType, _lib: transferObject) => {
  let rets: activeObject | null = null;
  const Query = opts.query;
  const options = opts.options;
  if (options && options.activeObject) {
    // 包含活动对象
    rets = options.activeObject;
  } else {
    rets = {
      key: "page",
      default: 1,
    };
  }
  const key = rets.key;
  const defaultValue = rets.default;
  // let inited = false;
  let rejectInfo: string | null = null;
  let resetDefault = ValAcross;
  const getKeys = function (key: string): any[] {
    return Object.keys(Query).filter((_key: string) => _key !== key);
  };
  if (key in Query) {
    // inited = true;
    resetDefault = ((keys) => (currentKey: string) => {
      if (keys.includes(currentKey)) Query[key] = defaultValue;
    })(getKeys(key));
  } else {
    rejectInfo =
      "activeObject invalid key " + key + ", could not fond in Query set";
  }
  _lib.activeObject = {
    inited: false,
    key,
    defaultValue,
    rejectInfo,
    resetDefault,
  };
};

const _ProxyCenter = (options: any, handlerFn: IFunction<proxyHandler>) => {
  const handler = handlerFn();
  return new Proxy(options, handler);
};

const InjectHandler =
  (handler: proxyHandler = Empty) =>
  (lib: transferObject) => ({
    ...getSet(handler.set, lib),
    ...getGet(handler.get),
  });

const handler: proxyHandler = {};

const getSet = (
  handlerSet: IFunction | undefined = NOOP,
  lib: transferObject
) => ({
  set: (obj: IObject, prop: string, value: any) => {
    try {
      if (obj[prop] !== value) {
        lib.captureMethod();
        lib.activeObject.resetDefault(prop);
      }
      handlerSet.apply(obj, [obj, prop, value]);
    } catch (error) {
      /* no inited */
    }
    obj[prop] = value;
    return true;
  },
});

const getGet = (handlerGet: IFunction | undefined = NOOP) => ({
  get: (obj: IObject, prop: string) => {
    handlerGet.apply(obj, [obj, prop]);
    return obj[prop];
  },
});

const getQuery = function (lib: transferObject<any>) {
  return lib.Query;
};

const mount =
  (options: transferObject<any>) =>
  (lib: transferObject, reactive: IFunction) => {
    const Data = reactive(options);
    lib.reactive = reactive;
    lib.Query = Data;
    // lib.activeObject.mounted = true;
  };

const capture = (
  lib: transferObject,
  httpRequeset: IFunction<IThenable>,
  resultFilter: IFunction<IObject> = ValAcross
) => {
  // 注册capture 时直接注册 result 这里先注册为 数组, 后续可以自定义类型;
  const Result = lib.reactive({ data: lib.Opts.result });
  lib.Result = Result;
  lib.captureMethod = createCaptureMethod(lib, httpRequeset, resultFilter);
  lib.Timer = null;
  lib.activeObject.inited = true;
};

const getResult = (lib: transferObject) => {
  return lib.Result;
};

const createCaptureMethod = (
  lib: transferObject,
  httpRequeset: IFunction<IThenable>,
  resultFilter: IFunction<IObject>
) => {
  const query = lib.Query;
  const options = lib.options || {};
  const requsetDely = options.requestDely;
  return () => {
    clearTimeout(lib.Timer);
    lib.Timer = setTimeout(() => {
      httpRequeset(query).then((result: IRespones) => {
        lib.Result.data = resultFilter(result);
      });
    }, requsetDely || 0);
  };
};

const reset = (lib: transferObject) => {
  lib.captureMethod();
};
const Pocket =
  (_lib: transferObject<any>, fn: IFunction) =>
  (...argus: any): any =>
    fn.apply(null, [_lib, ...argus]);

export const Transfer = function (Opts: TransferType): transferReturn {
  const LIB = {};
  const _reactivedQuery = _ProxyCenter(
    Opts.query,
    Pocket(LIB, InjectHandler(Opts.handler))
  );
  ReadSetActiveOpts(Opts, LIB);
  return {
    mount: Pocket(LIB, mount(_reactivedQuery)),
    getQuery: Pocket(LIB, getQuery),
    capture: Pocket(LIB, capture),
    getResult: Pocket(LIB, getResult),
    reset: Pocket(LIB, reset),
  };
};

export class CacheTransfer {
  constructor(Opts: TransferType) {
    const myThis = this as any;
    myThis.LIB = { Opts };
    myThis._reactivedQuery = _ProxyCenter(
      Opts.query,
      Pocket(myThis.LIB, InjectHandler(Opts.handler))
    );
    ReadSetActiveOpts(Opts, myThis.LIB);
  }
  mount(reactive: any) {
    const myThis = this as any;
    if (myThis.LIB.activeObject.inited) return;
    Pocket(myThis.LIB, mount(myThis._reactivedQuery))(reactive);
  }
  getQuery() {
    const myThis = this as any;
    return Pocket(myThis.LIB, getQuery)();
  }

  capture(
    httpRequeset: IFunction<IThenable>,
    resultFilter: IFunction<IObject> = ValAcross
  ) {
    const myThis = this as any;
    if (myThis.LIB.activeObject.inited) return;
    return Pocket(myThis.LIB, capture)(httpRequeset, resultFilter);
  }

  getResult() {
    const myThis = this as any;
    return Pocket(myThis.LIB, getResult)();
  }

  reset() {
    const myThis = this as any;
    return Pocket(myThis.LIB, reset)();
  }
}
