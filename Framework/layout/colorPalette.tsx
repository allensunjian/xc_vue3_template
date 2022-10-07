/*
 * @Author: allensunjian Allen_sun_js@hotmail.com
 * @Date: 2022-08-19 10:53:17
 * @LastEditors: allensunjian Allen_sun_js@hotmail.com
 * @LastEditTime: 2022-09-21 17:15:33
 * @FilePath: \xc_customer-service\Framework\layout\colorPalette.tsx
 * @Description: ui剪切板
 */
import { defineComponent, reactive, ref, onMounted } from "vue";
import CS from "./colorPalette.style";
import { ElDialog, ElMessage } from "element-plus";
import { copyToClipboard } from "../scripts/utils";
import { EuiStyle } from "../dictionary/dict";
import { IObject } from "@/types/interface";
import IconPalette from "./iconPalette";
type TuiStyle = "font_clr" | "background_clr";
const RenderView = (state: any) => () => {
  const toggle = () => (state.show = !state.show);
  const copy = (text: string) => () => {
    copyToClipboard(`var(${text})`);
    ElMessage.success("已复制");
  };
  const copyResouce = (text: string) => () => {
    copyToClipboard(`window.GETRESOURCE_PALETTE('${text}')`);
    ElMessage.success("已复制");
  };

  const selectedIconCopy = (str: string) => {
    const text = `<i class='${str}'></i>`;
    copyToClipboard(text);
    ElMessage.success("已复制");
  };
  return (
    <div class={CS.classes.Palette_layout} onClick={toggle}>
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4951"
        width="40"
        height="40"
        style="cursor: pointer"
      >
        <path
          d="M495.468758 991.155033c-16.782222 0-34.367582-1.606275-53.559216-3.998955l-4.802091-0.803137c-135.880784-20.781176-228.592941-152.663007-232.591895-158.268235-131.095425-199.830588-65.539346-402.053856 58.344575-513.957647 123.097516-111.903791 328.516601-159.857778 508.352418-15.175948 115.902745 93.515294 151.073464 223.004444 152.663007 228.592941v1.589543c16.782222 91.122614 3.195817 158.268235-40.759216 201.42013-67.145621 64.736209-178.246275 43.955033-193.422222 40.759216-20.781176-2.39268-35.973856 3.998954-47.167582 17.58536-11.996863 15.19268-14.389542 35.170719-10.390588 47.167581 11.193725 33.564444 12.783268 59.147712 4.802091 78.339347-23.173856 50.380131-70.324706 76.749804-141.469281 76.749804z m-51.149804-52.756079"
          fill="#B3F995"
          p-id="4952"
        ></path>
        <path
          d="M468.329412 1009.62719c-21.366797 0-43.754248-2.041307-68.183007-5.086536l-6.107189-1.020654C221.046797 977.049935 103.002353 809.144052 97.915817 802.032941c-166.885229-254.410458-83.442614-511.866144 74.290196-654.339346C328.91817 5.220392 590.456471-55.834771 819.417516 128.351373c147.559739 119.065098 192.334641 283.90902 194.375948 291.036862v2.024575c21.366797 116.003137 4.065882 201.487059-51.902745 256.451765-85.483922 82.421961-226.936471 55.968627-246.261961 51.902745-26.453333-3.061961-45.795556 5.086536-60.051242 22.387451-15.259608 19.342222-18.321569 44.774902-13.235032 60.051242 14.238954 42.733595 16.280261 75.31085 6.107189 99.722876-29.498562 64.100392-89.549804 97.698301-180.120261 97.698301z m-65.121046-67.162353l6.10719 1.020653c98.702222 15.259608 158.753464-4.065882 183.16549-59.013856 0-1.020654 5.086536-14.255686-8.148497-54.947974-13.235033-36.626405-3.045229-84.463268 23.408105-117.023791 27.473987-34.60183 68.183007-49.861438 116.003137-44.774902l3.061961 1.020654c1.020654 0 127.196863 27.473987 192.33464-35.622484 39.688366-38.667712 51.886013-105.830065 34.60183-199.445751-4.065882-13.235033-47.820131-156.712157-174.013072-257.455687-199.445752-162.819346-428.423529-108.892026-566.814117 16.280262C85.71817 308.471634-7.914248 529.300915 148.797908 768.435033c1.020654 0 107.871373 152.646275 254.410458 174.029804z m0 0"
          fill="#00B48A"
          p-id="4953"
        ></path>
        <path
          d="M164.074248 530.321569c0 33.715033 27.340131 61.055163 61.055164 61.055163 33.715033 0 61.055163-27.340131 61.055163-61.055163 0-33.715033-27.340131-61.055163-61.055163-61.055164-33.731765 0-61.055163 27.323399-61.055164 61.055164z m0 0M235.302484 347.139346c0 33.715033 27.340131 61.055163 61.055163 61.055164 33.731765 0 61.055163-27.340131 61.055163-61.055164 0-33.715033-27.340131-61.055163-61.055163-61.055163-33.715033 0-61.055163 27.340131-61.055163 61.055163z m0 0M418.467974 245.375163c0 33.715033 27.340131 61.055163 61.055163 61.055164 33.715033 0 61.055163-27.340131 61.055164-61.055164s-27.340131-61.055163-61.055164-61.055163c-33.715033 0-61.055163 27.340131-61.055163 61.055163z m0 0M621.99634 296.257255c0 33.715033 27.340131 61.055163 61.055163 61.055163 33.715033 0 61.055163-27.340131 61.055164-61.055163 0-33.715033-27.340131-61.055163-61.055164-61.055163-33.715033 0-61.055163 27.340131-61.055163 61.055163z m0 0M723.760523 459.093333c0 33.715033 27.340131 61.055163 61.055163 61.055164 33.715033 0 61.055163-27.340131 61.055164-61.055164 0-33.731765-27.340131-61.055163-61.055164-61.055163-33.715033-0.016732-61.055163 27.323399-61.055163 61.055163z m0 0"
          fill="#00B48A"
          p-id="4954"
        ></path>
      </svg>
      <ElDialog
        modelValue={state.show}
        title={state.title}
        beforeClose={() => (state.show = false)}
        width="600px"
      >
        {/* icon资源 */}
        <div
          class={[
            CS.classes.Palette_dialog_item,
            CS.classes.Palette_dialog_subtitle,
          ]}
        >
          图标资源
        </div>
        {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <IconPalette onIconselect={selectedIconCopy}></IconPalette>
        {/* 颜色与尺寸 */}
        {Object.keys(state.content).map((blockName: string) => {
          return (
            <div class={CS.classes.Palette_dialog_content}>
              <div
                class={[
                  CS.classes.Palette_dialog_item,
                  CS.classes.Palette_dialog_subtitle,
                ]}
              >
                {EuiStyle[blockName as TuiStyle]}
              </div>
              {Object.keys(state.content[blockName]).map((blockitem) => {
                return (
                  <div
                    class={CS.classes.Palette_dialog_item}
                    onClick={copy(blockitem)}
                  >
                    <span
                      class={[CS.classes.Palette_dialog_state]}
                      style={`background:${state.content[blockName][blockitem]}`}
                    ></span>
                    <span class={CS.classes.Palette_dialog_copytext}>
                      <span style="flex:0 0 80px">
                        ({state.content[blockName][blockitem]})
                      </span>{" "}
                      {blockitem}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* 图片资源 */}
        <div class={CS.classes.Palette_dialog_content}>
          <div
            class={[
              CS.classes.Palette_dialog_item,
              CS.classes.Palette_dialog_subtitle,
            ]}
          >
            图片资源
          </div>
          <div
            class={[
              CS.classes.Palette_dialog_item,
              CS.classes.Palette_dialog_flex,
            ]}
          >
            {Object.keys(state.resouces).map((blockitem) => {
              return (
                <img
                  onClick={copyResouce(blockitem)}
                  style="flex: 0 0 110px;height: 50px;object-fit: contain; margin-right: 10px; border:1px solid var(--background_clr-light-2);background: var(--background_clr-primary)"
                  src={state.resouces[blockitem]}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </ElDialog>
    </div>
  );
};
export default defineComponent({
  setup() {
    // const content: any = ref({});
    const State = reactive({
      show: false,
      title: "剪切板 (点击复制)",
      content: {},
      resouces: {},
    });
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      State.content = PALETTE_STATE;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      State.resouces = PALETTE_RESOURCE;
    });

    return RenderView(State);
  },
});
