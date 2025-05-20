declare module 'react-slick';
// global.d.ts or a declaration file
declare namespace JSX {
  interface IntrinsicElements {
    'pp-checkout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      accessToken?: string;
      locale?: string;
    };
  }
}
