Route Handlers allow you to create custom request handlers for a given route using the Web Request
and Response
APIs.

A route file allows you to create custom request handlers for a given route. The following HTTP methods
are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

###
export async function GET(request: Request) {}
###

###
export async function HEAD(request: Request) {}
###

###
export async function POST(request: Request) {}
###

###
export async function PUT(request: Request) {}
###

###
export async function DELETE(request: Request) {}
###

###
export async function PATCH(request: Request) {}
###

###
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
###

File structure:
Example	URL	params
app/dashboard/[team]/route.js	/dashboard/1	{ team: '1' }
app/shop/[tag]/[item]/route.js	/shop/1/2	{ tag: '1', item: '2' }
app/blog/[...slug]/route.js	/blog/1/2	{ slug: ['1', '2'] }

RULES:
Make sure to implement all `TODO` comments.