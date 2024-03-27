import { SVGAttributes } from 'react';

import Circle from './circle';

// here we register all the shapes that are available
// you can add your own here
export const ShapeComponents = {
    circle: Circle,
};

export type ShapeType = keyof typeof ShapeComponents;

export type ShapeProps = {
    width: number;
    height: number;
} & SVGAttributes<SVGElement>;

export type ShapeComponentProps = Partial<ShapeProps> & { type: ShapeType };
