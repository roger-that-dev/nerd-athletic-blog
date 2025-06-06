import http.server
import socketserver
import os


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header(
            "Cache-Control", "no-store, no-cache, must-revalidate, max-age=0"
        )
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def run_server(directory="web", port=8000):
    os.chdir(directory)
    handler = NoCacheHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Serving '{directory}' at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Run a simple static web server."
    )
    parser.add_argument(
        "--dir", default="web", help="Directory to serve (default: web)"
    )
    parser.add_argument(
        "--port", type=int, default=8000, help="Port to use (default: 8000)"
    )
    args = parser.parse_args()
    run_server(args.dir, args.port)
