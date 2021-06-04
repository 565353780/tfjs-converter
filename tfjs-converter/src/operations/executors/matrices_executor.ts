/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tfc from '@tensorflow/tfjs-core';

import {NamedTensorsMap} from '../../data/types';
import {ExecutionContext} from '../../executor/execution_context';
import {InternalOpExecutor, Node} from '../types';

import {getParamValue} from './utils';

export let executeOp: InternalOpExecutor = (node: Node,
                                            tensorMap: NamedTensorsMap,
                                            context: ExecutionContext):
                                               tfc.Tensor[] => {
  switch (node.op) {
    case 'BatchMatMul':
    case 'BatchMatMulV2':
    case 'MatMul':
      return [tfc.matMul(
          getParamValue('a', node, tensorMap, context) as tfc.Tensor2D,
          getParamValue('b', node, tensorMap, context) as tfc.Tensor2D,
          getParamValue('transposeA', node, tensorMap, context) as boolean,
          getParamValue('transposeB', node, tensorMap, context) as boolean)];
    case 'Transpose':
      return [tfc.transpose(
          getParamValue('x', node, tensorMap, context) as tfc.Tensor,
          getParamValue('perm', node, tensorMap, context) as number[])];

    default:
      throw TypeError(`Node type ${node.op} is not implemented`);
  }
};

export const CATEGORY = 'matrices';
