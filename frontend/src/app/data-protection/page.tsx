import { Typography } from "@/components/ui/typography";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import path from "path";
import ScrollButton from "@/components/scroll-button/scroll-button";

/*
  @desc Retrieves the markdown content
*/
async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "src/data/data-protection.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);
  return content;
}

/*
  @desc Displays the data protection page
*/
const DataProtectionPage = async () => {
  // retrieve the markdown content
  const content = await getMarkdownContent();

  // return the data protection page
  return (
    <div className="px-4 min-[640px]:px-10">
      {/* heading */}
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="Datenschutz" tabIndex={0}>
            Datenschutz
          </h1>
        </Typography>
      </div>
      {/* content */}
      <div className="my-10 font-figtreeRegular">
        <Markdown
          options={{
            overrides: {
              h2: {
                component: ({ children }) => (
                  <Typography variant="heading3" className="mb-4 mt-8">
                    {children}
                  </Typography>
                ),
              },
              h3: {
                component: ({ children }) => (
                  <Typography variant="body" className="mb-3 mt-6">
                    {children}
                  </Typography>
                ),
              },
              p: {
                component: ({ children }) => (
                  <Typography variant="small" className="mb-4">
                    {children}
                  </Typography>
                ),
              },
              ul: {
                component: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
                ),
              },
            },
          }}
        >
          {content}
        </Markdown>
      </div>
      {/* scroll button */}
      <ScrollButton />
    </div>
  );
};

export default DataProtectionPage;
