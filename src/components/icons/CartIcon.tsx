import React from 'react';

interface Props {
  className?: string;
}

export const CartIcon: React.FC<Props> = ({className}) => (
  <svg
    className={className}
    id='Capa_1'
    x='0px'
    y='0px'
    viewBox='0 0 490.996 490.996'
    fill='currentColor'
  >
    <g>
      <g id='Icons_1_'>
        <g>
          <path
            d='M484.058,112.28c-7.247-10.404-19.144-16.614-31.816-16.614h-94.624c13.291,2.775,24.603,11.714,29.943,24.615
				c1.063,2.569,1.761,5.212,2.283,7.869h62.396c2.063,0,3.997,1.015,5.155,2.67c1.175,1.698,1.444,3.862,0.73,5.791
				l-44.992,121.107c-0.905,2.451-3.267,4.102-5.887,4.102H154.939L114.734,90.314c-5.01-21.286-23.772-36.153-45.631-36.153H24.361
				C10.912,54.161,0,65.065,0,78.522s10.912,24.362,24.361,24.362h43.286l54.131,230.919c4.914,20.864,23.058,35.479,44.36,36.042
				c-12.532,9.103-20.764,23.765-20.764,40.436c0,27.662,22.429,50.078,50.09,50.078c27.662,0,50.072-22.416,50.072-50.078
				c0-16.605-8.17-31.212-20.623-40.326h93.421c-12.454,9.114-20.634,23.721-20.634,40.326c0,27.662,22.428,50.078,50.083,50.078
				c27.646,0,50.072-22.416,50.072-50.078c0-16.605-8.187-31.212-20.634-40.326h22.714c13.448,0,24.361-10.901,24.361-24.361
				c0-13.457-10.913-24.361-24.361-24.361h-231.07l-6.313-26.931h244.693c16.113,0,30.703-10.143,36.338-25.256l44.994-121.118
				C492.986,136.046,491.305,122.732,484.058,112.28z'
          />
          <path
            d='M275.701,209.63c1.776,1.785,4.109,2.673,6.437,2.673c2.334,0,4.667-0.888,6.426-2.673l67.007-66.987
				c2.621-2.609,3.396-6.525,1.986-9.935c-0.923-2.221-3.986-5.64-8.422-5.64c-6.472,0-25.886,0-25.886,0V95.665v-55.89
				c-0.017-5.035-4.094-9.137-9.138-9.137h-63.964c-5.044,0-9.12,4.102-9.12,9.12v55.908v31.412c0,0-19.408,0-25.878,0
				c-4.144,0-7.473,3.332-8.424,5.622c-1.41,3.41-0.635,7.334,1.962,9.943L275.701,209.63z'
          />
        </g>
      </g>
    </g>
  </svg>
);
