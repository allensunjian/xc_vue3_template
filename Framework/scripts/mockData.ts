interface optType {
  item: Array<baseItemType>;
}

type baseItemType = {
  key: string;
  label?: string;
  type: string;
  defaultValue?: any;
  randomList?: Array<any>;
  range?: number[];
};

interface IFunction<T = any> {
  (...items: Array<any>): T;
}

interface IThenable {
  then: IFunction<void>;
}

interface IObject<T = any> {
  [x: string]: T;
}

interface IRespones {
  msg: null | string;
  code: number;
  data: IObject | null;
}

const rangeRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Methods = {
  increase: (obj: baseItemType) => {
    let start = isNaN(obj.defaultValue) ? 0 : obj.defaultValue;
    let isFirst = true;
    return () => {
      if (isFirst) {
        isFirst = false;
        return { key: obj.key, value: start };
      } else {
        return { key: obj.key, value: start++ };
      }
    };
  },
  random: (obj: baseItemType) => {
    const randomList = obj.randomList || [];
    return () => {
      const len = rangeRandomNumber(0, randomList.length);
      return {
        key: obj.key,
        value: randomList[len] ? randomList[len] : randomList[0],
      };
    };
  },
  numberRange: (obj: baseItemType) => {
    const rangeNum = obj.range || [0, 10000];
    return () => {
      return {
        key: obj.key,
        value: rangeRandomNumber(rangeNum[0], rangeNum[1]),
      };
    };
  },
  dateTime: (obj: baseItemType) => {
    return () => {
      let date = rangeRandomNumber(0, 30 * 24 * 60 * 60 * 1000);
      const currentTime = new Date().getTime();
      const createdTime = currentTime - date;
      return {
        key: obj.key,
        value:
          new Date(createdTime).toLocaleDateString() +
          " " +
          new Date(createdTime).toLocaleTimeString(),
      };
    };
  },
};

const GetDataFromQuery = (page: number, limit: number, blocks: any[]) => {
  const pos_start = page == 1 ? 0 : (page - 1) * limit;
  return blocks.slice(pos_start, pos_start + limit);
};
export const Mock = (
  options: optType,
  dely: number,
  total: number
): IFunction => {
  let Blocks: any[] = [];
  const _methods: IObject<any> = {};
  const items = options.item;
  let size = total;

  items.forEach((o: baseItemType) => {
    const method = (Methods as IObject)[o.type];
    if (!method) {
      console.error("invalid type " + o.type);
      return;
    }
    if (Array.isArray(_methods[o.type])) {
      _methods[o.type].push((Methods as IObject)[o.type](o));
    } else {
      _methods[o.type] = [(Methods as IObject)[o.type](o)];
    }
  });
  const CreateItem = () => {
    while (size > 0) {
      let ret: any = {};
      Object.keys(_methods).forEach((key: string) => {
        const methodsArr = (_methods as IObject)[key];
        let inner = methodsArr.reduce(
          (ref: any, cur: IFunction<any>): IObject => {
            const valueMap = cur();
            if (valueMap) {
              ref[valueMap.key] = valueMap.value;
            }
            return ref;
          },
          {}
        );
        ret = { ...ret, ...inner };
      });
      Blocks.push(ret);
      size--;
    }
  };
  CreateItem();
  const ResetBlocks = function (query: any) {
    Blocks = [];
    CreateItem();
  };

  let QueryLib = {};
  const CurrentMethod: IFunction<IThenable> = (query) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 0,
          total,
          data: GetDataFromQuery(query.page, query.limit, Blocks),
        });
      }, dely | 0);
    });
  };
  (CurrentMethod as any).ResetBlocks = ResetBlocks;
  return CurrentMethod;
};
