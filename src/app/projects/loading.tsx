export default function ProjectsLoading() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="h-12 w-64 mx-auto bg-purple-500/10 rounded-lg animate-pulse mb-6" />
          <div className="h-6 w-96 mx-auto bg-purple-500/10 rounded-lg animate-pulse" />
        </div>

        <div className="grid gap-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="mystical-card"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="h-8 w-48 bg-purple-500/10 rounded-lg animate-pulse" />
                  <div className="flex items-center gap-4">
                    <div className="h-5 w-5 bg-purple-500/10 rounded-full animate-pulse" />
                    <div className="h-5 w-5 bg-purple-500/10 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="h-20 bg-purple-500/10 rounded-lg animate-pulse mb-6" />

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((tech) => (
                    <div
                      key={tech}
                      className="h-6 w-20 bg-purple-500/10 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
