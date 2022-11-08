import { useCallback, useMemo } from 'react'
import type { Engine } from 'tsparticles-engine'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { loadPolygonMaskPlugin, PolygonMaskType, PolygonMaskInlineArrangement } from 'tsparticles-plugin-polygon-mask'
import type { IPolygonMask } from 'tsparticles-plugin-polygon-mask/types/Options/Interfaces/IPolygonMask'
import _ from 'lodash'

// 512 x 512
const HEART_PATH =
  'M 256 69.269531 C 388.519531 -66.257812 722.824219 171.671875 256 481.882812 C -210.824219 171.671875 123.480469 -66.257812 256 69.269531 Z M 256 69.269531'

const getHeartPath = (size?: number, offset?: number) => {
  size = size || 512
  offset = offset || 0

  if (size == 512) {
    return HEART_PATH
  }
  return HEART_PATH.split(' ')
    .map(p => (/-?\d+(\.\d+)?/.test(p) ? (size! / 512.0) * _.toNumber(p) + offset! : p))
    .join(' ')
}

const getMultipleHeartPaths = (sizes: [number, ...number[]]) => {
  const paths = []
  paths.push(getHeartPath(sizes[0]))

  for (let i = 1; i < sizes.length; ++i) {
    const size = sizes[i]
    if (size >= 512) continue
    paths.push(getHeartPath(size, (512.0 - size) / 2.0))
  }
  return paths
}

const HeartParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
    await loadPolygonMaskPlugin(engine)
  }, [])

  const paths = useMemo(() => getMultipleHeartPaths([512, 496, 464, 400, 320]), [])

  const polygon: IPolygonMask = {
    data: {
      path: paths,
      size: {
        width: 512,
        height: 512
      }
    },
    draw: {
      enable: false,
      lineColor: '#cecece',
      lineWidth: 2,
      stroke: {
        color: '#bcbcbc',
        opacity: 0.5,
        width: 2
      }
    },
    enable: true,
    inline: {
      arrangement: 'equidistant' as PolygonMaskInlineArrangement
    },
    move: {
      type: 'path',
      radius: 8
    },
    scale: 1.8,
    type: 'inline' as PolygonMaskType,
    position: {
      x: 64,
      y: 48
    }
  }

  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      options={{
        fullScreen: false,
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'repulse'
            },
            resize: true
          },
          modes: {
            push: {
              quantity: 1
            },
            repulse: {
              distance: 8,
              duration: 0.1
            },
            bubble: {
              distance: 40,
              duration: 2,
              opacity: 8,
              size: 6,
              speed: 3
            }
          }
        },
        background: {
          color: {
            value: '#000000'
          }
        },
        particles: {
          color: {
            value: ['#D15A7C', '#EA047E']
            // animation: {
            //   enable: true,
            //   speed: 20,
            //   sync: true
            // }
          },
          move: {
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 1200
              }
            },
            bounce: true,
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: true,
            speed: 0.5,
            straight: false
          },
          number: {
            density: {
              enable: false,
              area: 2000
            },
            limit: 0,
            value: 350
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.5,
              speed: 2,
              sync: false
            },
            random: false,
            value: 1
          },
          shape: {
            type: 'circle'
          },
          size: {
            animation: {
              enable: true,
              minimumValue: 0.5,
              speed: 5,
              sync: false
            },
            random: true,
            value: 2
          }
        },
        polygon
      }}
    />
  )
}

export default HeartParticles
