export interface TipsVue extends Vue {
  visible: boolean;
  message: string;
  position: {
    top: number;
    left: number;
  };
  transform: string;
  cancel: () => void;
  setTips: (tips: string) => void;
  autoCloseTimer: NodeJS.Timeout;

  afterLeave: (el: HTMLElement, done: () => void) => void;
  handleGetOffsetXY: (left: number, top: number) => `${number}${number}`;
}
