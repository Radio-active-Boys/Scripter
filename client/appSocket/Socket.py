import socketio
from aiohttp import web

sio = socketio.AsyncServer(cors_allowed_origins='*')  # Allow all origins for testing

app = web.Application()
sio.attach(app)

@sio.event
async def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
async def message(sid, data):
    print('Received message:', data)
    await sio.emit('message', data, to=sid)

@sio.event
async def disconnect(sid):
    print('Client disconnected:', sid)

if __name__ == '__main__':
    web.run_app(app, host='172.18.10.103', port=8080)
