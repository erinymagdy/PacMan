

namespace PacMan.Models
{
    public class Boundary
    {
        private readonly int X;
        private readonly int Y;
        private readonly int Width;
        private readonly int Height;

        Boundary(int x, int y , int width , int height)
        {
            this.X= x;
            this.Y = y;
            this.Width = width;
            this.Height = height;
        }

    }
}
