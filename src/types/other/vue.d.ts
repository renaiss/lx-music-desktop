export type ThisFunc<This, Param, Ret> = (this: This, ...args: Param) => Ret;
export type ThisFuncMap<This, ParamMap, RetMap> = { [name in (keyof ParamMap | keyof RetMap)]: ThisFunc<This, ParamMap[name], RetMap[name]> };
export type InferMapFunc<This> = <PM, RM>(p: ThisFuncMap<This, PM, RM>) => ThisFuncMap<This, PM, RM>;

export type ComponentOptions<
  This,
  MethodParam,
  MethodReturn,
  > = {
    methods?: ThisFuncMap<This, MethodParam, MethodReturn>;
  };

export type ComponentOptionsFunc = <
  MethodParam,
  MethodReturn,
  This = MakeThis<MethodParam, MethodReturn>,
  >(info: ComponentOptions<This, MethodParam, MethodReturn>)
  => ComponentOptions<This, MethodParam, MethodReturn>;
