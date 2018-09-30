using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FirebaseTest
{
    class Program
    {
        public static void Main(string[] args)
        {
            while(true)
            {
                Console.WriteLine("FireBase Test Program: ");
                Console.Write("1. Enter User\n2. Get User\n3. Exit Program\n\nYour Choice: ");
                string choiceString = Console.ReadLine();
                int choice = int.Parse(choiceString);

                if (choice == 1)
                {
                    createUserJson();
                }
                else if (choice == 2)
                {
                    Console.WriteLine("Get user is currently not functional.");
                }
                else if (choice == 3)
                {
                    Console.WriteLine("Exitting...");
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid input. Please try again...");
                }
            }
        }

        public static void createUserJson()
        {
            try
            {
                string userName = "";
                var userID = Guid.NewGuid().ToString("N");
                Console.Write("\nYou've chosen to create user.\nPlease enter username: ");
                userName = Console.ReadLine();

                var json = Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    Name = userID.ToString(),
                    Value = userName
                });

                var request = WebRequest.CreateHttp("https://sportscave-c0722.firebaseio.com/.json");
                request.Method = "POST";
                request.ContentType = "application/json";
                var buffer = Encoding.UTF8.GetBytes(json);
                request.ContentLength = buffer.Length;
                request.GetRequestStream().Write(buffer, 0, buffer.Length);
                var response = request.GetResponse();
                json = (new StreamReader(response.GetResponseStream())).ReadToEnd();

                Console.WriteLine("\nUser added to database.");
            }
            catch(Exception e)
            {
                Console.WriteLine("ERROR: " + e.StackTrace.ToString());
            }
        }
        
    }
}
