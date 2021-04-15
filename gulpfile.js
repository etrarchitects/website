const { series } = require('gulp');
const {rmdirSync, readFileSync, writeFileSync} = require("fs")
const path = require("path")

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
 function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }

const outputPath = "src/generated";

const toEdit = [
  {
    file: path.join(outputPath, "GetTeams.ts"),
    add: [
      {
        line: 5,
        str: `import { ImgFormatType } from "../api";\n`
      }
    ],
    replace: [
      {
        from: "formats: any | null;",
        to: "formats: ImgFormatType;"
      }
    ]
  },
  {
    file: path.join(outputPath, "GetPosts.ts"),
    add: [
      {
        line: 5,
        str: `import { ImgFormatType } from "../api";\n`
      }
    ],
    replace: [
      {
        from: "formats: any | null;",
        to: "formats: ImgFormatType;"
      },
    ]
  },
  {
    file: path.join(outputPath, "GetPost.ts"),
    add: [
      {
        line: 5,
        str: `import { ImgFormatType } from "../api";\n`
      }
    ],
    replace: [
      {
        from: "formats: any | null;",
        to: "formats: ImgFormatType;"
      },
      {
        from: "img: GetPost_post_slideshow_img | null;",
        to: "img: GetPost_post_slideshow_img;"
      },
      {
        from: "caption: string | null;",
        to: "caption: string;"
      }
    ]
  },
  {
    file: path.join(outputPath, "GetBackgroundImages.ts"),
    add: [
      {
        line: 5,
        str: `import { ImgFormatType } from "../api";\n`
      }
    ],
    replace: [
      {
        from: "formats: any | null;",
        to: "formats: ImgFormatType;"
      },
    ]
  },
  {
    file: path.join(outputPath, "GetPosts.ts"),
    add: [],
    replace: [
      {
        from: "thumbnail: GetPosts_posts_thumbnail | null;",
        to: "thumbnail: GetPosts_posts_thumbnail;"
      }
    ]
  }
]

function clean(cb){
  rmdirSync(outputPath, {recursive: true})
  return cb()
}

async function build(cb){
  const args = [
    "--localSchemaFile schema.graphql",
    "--excludes=node_modules/*",
    "--includes=**/api/query.ts",
    "--target typescript",
    "--tagName gql",
    `--outputFlat ${outputPath}`
  ]
  await execShellCommand(`npx apollo codegen:generate ${args.join(" ")}`)
  return cb()
}


async function cleanAfter(cb){
  // const file = path.join(outputPath,"globalTypes.ts");
  // const res = readFileSync(file)
  // console.log("DELETING....")
  // console.log(res.toString());
  // await execShellCommand(`rm -rf ${file}`)
  return cb();
}

async function edit(cb){
  toEdit.forEach(({file,add,replace}) => {
    let data = readFileSync(file).toString();

    let splitted = data.split(/\r\n|\r|\n/g);

    add.forEach(e => {
      splitted.splice(e.line, 0, e.str);
    })
    data = splitted.join("\n")
    replace.forEach(e => data = data.replace(e.from, e.to))
    writeFileSync(file, data);
  })
  return cb();
}


exports.generateSchema = series(clean, build, cleanAfter, edit);