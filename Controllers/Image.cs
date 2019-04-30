using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using BeautySoul_Core.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BeautySoul_Core.Controllers
{
    public class ImageController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IHostingEnvironment _currentEnvironment;
        public ImageController(
          ApplicationDbContext db,
          IHostingEnvironment currentEnvironment)
        {
            _db = db;
            _currentEnvironment = currentEnvironment;
        }


        [HttpPost]
        public async Task<IActionResult> Save(IList<IFormFile> files)
        {
            foreach (IFormFile source in files)
            {
                string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');

                filename = this.EnsureCorrectFilename(filename);
                using (FileStream output = System.IO.File.Create(GetPathAndFilename(filename)))
                {
                    await source.CopyToAsync(output);
                }
                return Ok("\\uploads\\"+filename);
            }
            return StatusCode(404);
        }

        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {
            return _currentEnvironment.WebRootPath + "\\uploads\\" + filename;
        }
    }
}