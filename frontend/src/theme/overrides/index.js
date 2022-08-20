import { merge } from 'lodash';

import Input from './Input';
import Button from './Button';
import Chip from './Chip';
import LoadingButton from './LoadingButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(Input(theme), Button(theme), Chip(theme), LoadingButton(theme));
}
