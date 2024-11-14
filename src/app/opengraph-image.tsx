import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'David Anyatonwu - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #111827, #000000)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(147, 51, 234, 0.5)',
            borderRadius: '16px',
            padding: '40px',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #9333EA, #4F46E5)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            David Anyatonwu
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#E5E7EB',
              margin: '0',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            Blockchain Developer & Software Engineer
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#9CA3AF',
              margin: '0',
              textAlign: 'center',
            }}
          >
            Building innovative solutions with cutting-edge technology
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
