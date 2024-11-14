import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'David Anyatonwu';
    const description = searchParams.get('description') || 'Full Stack Developer & Blockchain Engineer';
    const type = searchParams.get('type') || 'website';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0F172A', 
            padding: 80,
            position: 'relative',
            fontFamily: 'monospace',
          }}
        >
          {/* Matrix-like Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)',
              opacity: 0.5,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {/* Simulated Code Pattern */}
            <div style={{ 
              position: 'absolute', 
              right: -100, 
              top: 40, 
              color: 'rgba(148, 163, 184, 0.1)', 
              fontSize: 14,
              fontFamily: 'monospace',
              transform: 'rotate(15deg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              {`const developer = {`}<br />
              {`  name: "David",`}<br />
              {`  skills: ["Web3", "React"],`}<br />
              {`  passion: "Building"`}<br />
              {`};`}
            </div>
          </div>

          {/* Glowing Accent Lines */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              width: 3,
              height: 80,
              background: 'linear-gradient(180deg, #A855F7 0%, transparent 100%)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              width: 3,
              height: 80,
              background: 'linear-gradient(0deg, #38BDF8 0%, transparent 100%)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
              display: 'flex',
            }}
          />

          {/* Content Container */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 48,
              position: 'relative',
              zIndex: 1,
              width: '100%',
            }}
          >
            {/* Profile Image Container with Glowing Border */}
            <div
              style={{
                borderRadius: '50%',
                overflow: 'hidden',
                width: 220,
                height: 220,
                flexShrink: 0,
                border: '4px solid rgba(168, 85, 247, 0.8)',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                display: 'flex',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(56, 189, 248, 0.2))',
                  display: 'flex',
                }}
              />
              <img
                src="https://github.com/onyedikachi-david.png"
                alt="David Anyatonwu"
                width={220}
                height={220}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Text Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              {/* Tech Tag */}
              <div
                style={{
                  fontSize: 16,
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  backgroundColor: '#38BDF8',
                  borderRadius: '50%',
                  display: 'flex',
                }}/> DEVELOPER
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  background: 'linear-gradient(to right, #fff, #94A3B8)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: 1.1,
                  marginBottom: 16,
                  maxWidth: 800,
                  display: 'flex',
                }}
              >
                {title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 400,
                  color: '#94A3B8',
                  lineHeight: 1.4,
                  maxWidth: 800,
                  display: 'flex',
                }}
              >
                {description}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginTop: 'auto',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: '#A855F7',
                    display: 'flex',
                    fontFamily: 'monospace',
                  }}
                >
                  {'> '}davidanyatonwu.com
                </div>
                {type !== 'website' && (
                  <>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#4B5563',
                        display: 'flex',
                      }}
                    />
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 400,
                        color: '#94A3B8',
                        display: 'flex',
                        fontFamily: 'monospace',
                      }}
                    >
                      {type}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
