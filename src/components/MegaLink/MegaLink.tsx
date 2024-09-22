import { BASENAME } from '../../features/API';

export const MegaLink = (props: any) => {
  return (
    <a {...props} href={`${BASENAME}${props.href}`}>
      {props.children}
    </a>
  );
};
